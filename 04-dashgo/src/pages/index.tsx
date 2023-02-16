import { Input } from "@/components/form/input";
import { Button, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { ObjectSchema, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInFormData = {
    email: string;
    password: string;
};

const signInFormSchema = new ObjectSchema({
    email: string().required("E-mail Obrigatório").email("E-mail inválido"),
    password: string().required("Senha obrigatória"),
});

export default function SignIn() {
    const { register, handleSubmit, formState } = useForm<SignInFormData>({
        resolver: yupResolver(signInFormSchema),
    });
    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(values);
    };
    return (
        <>
            <Head>
                <title>SignIn | DashGo</title>
            </Head>
            <Flex align="center" justify="center" w="100vw" minH="100vh">
                <Flex
                    as="form"
                    onSubmit={handleSubmit(handleSignIn)}
                    flexDir="column"
                    w="100%"
                    maxW={360}
                    bg="gray.800"
                    p="8"
                    rounded="md"
                >
                    <Stack spacing="4">
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="john@example.com"
                            error={formState.errors.email}
                            {...register("email")}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="********"
                            error={formState.errors.password}
                            {...register("password", {
                                required: "Senha Obrigatória",
                            })}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        mt="6"
                        colorScheme="pink"
                        isLoading={formState.isSubmitting}
                    >
                        Entrar
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}
