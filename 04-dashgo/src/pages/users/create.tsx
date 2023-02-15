import { Input } from "@/components/form/input";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
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
import Head from "next/head";

export default function CreateUser() {
    return (
        <>
            <Head>
                <title>Create User | dashgo</title>
            </Head>
            <Box>
                <Header />
                <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                    <Sidebar />

                    <Box flex="1" rounded="md" bg="gray.800" p="8">
                        <Heading size="lg" fontWeight="normal">
                            Criar Usuário
                        </Heading>
                        <Divider my="6" borderColor="gray.700" />
                        <VStack spacing="8">
                            <SimpleGrid
                                minChildWidth="240px"
                                spacing="8"
                                width="100%"
                            >
                                <Input name="name" label="Nome Completo" />
                                <Input
                                    name="email"
                                    label="E-mail"
                                    type="email"
                                />
                            </SimpleGrid>

                            <SimpleGrid
                                minChildWidth="240px"
                                spacing="8"
                                width="100%"
                            >
                                <Input
                                    name="password"
                                    label="Senha"
                                    type="password"
                                />
                                <Input
                                    name="password_confirmation"
                                    label="Confirmação da senha"
                                    type="password"
                                />
                            </SimpleGrid>
                        </VStack>
                        <Flex align="center" justify="flex-end" mt="8">
                            <HStack spacing="4">
                                <Button colorScheme="whiteAlpha">
                                    Cancelar
                                </Button>
                                <Button colorScheme="pink">Salvar</Button>
                            </HStack>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
