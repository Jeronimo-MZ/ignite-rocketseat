import { Input } from "@/components/form/input";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { api } from "@/services/api";
import { queryClient } from "@/services/query-client";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, ref, string } from "yup";

type CreateUserFormData = {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
};

const createUserFormSchema = new ObjectSchema({
    name: string().required("Nome Obrigatório"),
    email: string().required("E-mail Obrigatório").email("E-mail inválido"),
    password: string()
        .required("Senha obrigatória")
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    password_confirmation: string().oneOf(
        [ref("password")],
        "As senhas devem ser iguais"
    ),
});

export default function CreateUser() {
    const router = useRouter();
    const createUser = useMutation(
        async (user: CreateUserFormData) => {
            const response = await api.post("users", {
                user: {
                    ...user,
                    created_at: new Date(),
                },
            });
            return response.data.user;
        },
        {
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ["users"] });
            },
        }
    );

    const { formState, register, handleSubmit } = useForm<CreateUserFormData>({
        resolver: yupResolver(createUserFormSchema),
    });

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
        values
    ) => {
        await createUser.mutateAsync(values);
        router.push("/users");
    };
    return (
        <>
            <Head>
                <title>Create User | dashgo</title>
            </Head>
            <Box>
                <Header />
                <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                    <Sidebar />

                    <Box
                        as="form"
                        onSubmit={handleSubmit(handleCreateUser)}
                        flex="1"
                        rounded="md"
                        bg="gray.800"
                        p={["6", "8"]}
                    >
                        <Heading size="lg" fontWeight="normal">
                            Criar Usuário
                        </Heading>
                        <Divider my="6" borderColor="gray.700" />
                        <VStack spacing={["4", "8"]}>
                            <SimpleGrid
                                minChildWidth="240px"
                                spacing={["4", "8"]}
                                width="100%"
                            >
                                <Input
                                    label="Nome Completo"
                                    error={formState.errors.name}
                                    {...register("name")}
                                />
                                <Input
                                    label="E-mail"
                                    type="email"
                                    error={formState.errors.email}
                                    {...register("email")}
                                />
                            </SimpleGrid>

                            <SimpleGrid
                                minChildWidth="240px"
                                spacing={["4", "8"]}
                                width="100%"
                            >
                                <Input
                                    label="Senha"
                                    type="password"
                                    error={formState.errors.password}
                                    {...register("password")}
                                />
                                <Input
                                    label="Confirmação da senha"
                                    type="password"
                                    error={
                                        formState.errors.password_confirmation
                                    }
                                    {...register("password_confirmation")}
                                />
                            </SimpleGrid>
                        </VStack>
                        <Flex align="center" justify="flex-end" mt="8">
                            <HStack spacing="4">
                                <Button
                                    colorScheme="whiteAlpha"
                                    as={NextLink}
                                    href="/users"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    colorScheme="pink"
                                    type="submit"
                                    isLoading={formState.isSubmitting}
                                >
                                    Salvar
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
