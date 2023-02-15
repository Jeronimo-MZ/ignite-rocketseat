import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>DashGo</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex align="center" justify="center" w="100vw" minH="100vh">
                <Flex
                    as="form"
                    flexDir="column"
                    w="100%"
                    maxW={360}
                    bg="gray.800"
                    p="8"
                    rounded="md"
                >
                    <Stack spacing="4">
                        <FormControl>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                type="email"
                                focusBorderColor="pink.500"
                                bg="gray.900"
                                variant="filled"
                                _hover={{ bg: "gray.900" }}
                                size="lg"
                                placeholder="john@example.com"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                focusBorderColor="pink.500"
                                bg="gray.900"
                                variant="filled"
                                _hover={{ bg: "gray.900" }}
                                size="lg"
                                placeholder="********"
                            />
                        </FormControl>
                    </Stack>
                    <Button type="submit" mt="6" colorScheme="pink">
                        Entrar
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}
