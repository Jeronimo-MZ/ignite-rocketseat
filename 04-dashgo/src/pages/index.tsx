import { Input } from "@/components/form/input";
import { Button, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import Head from "next/head";

export default function SignIn() {
    return (
        <>
            <Head>
                <title>SignIn | DashGo</title>
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
                        <Input
                            name="email"
                            label="E-mail"
                            type="email"
                            placeholder="john@example.com"
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="********"
                        />
                    </Stack>
                    <Button type="submit" mt="6" colorScheme="pink">
                        Entrar
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}
