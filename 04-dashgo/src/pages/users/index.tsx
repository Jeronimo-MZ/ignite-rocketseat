import { Header } from "@/components/header";
import { Pagination } from "@/components/pagination";
import { Sidebar } from "@/components/sidebar";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Icon,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
};

export default function UsersList() {
    const isWideVersion = useBreakpointValue({ base: false, lg: true });
    const { data, error, isLoading, isRefetching } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/users");
            const data = await response.json();
            const users = data.users.map((user: User) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: new Date(user.createdAt).toLocaleDateString(
                        "pt-BR",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }
                    ),
                };
            });
            return users;
        },
        staleTime: 5 * 1000, // 5 seconds,
    });

    return (
        <>
            <Head>
                <title>Users | dashgo</title>
            </Head>
            <Box>
                <Header />
                <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                    <Sidebar />

                    <Box flex="1" rounded="md" bg="gray.800" p="8">
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading fontWeight="normal" size="lg">
                                Usuários {isRefetching && <Spinner />}
                            </Heading>
                            <Button
                                as={NextLink}
                                href="/users/create"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} />}
                            >
                                Criar Novo
                            </Button>
                        </Flex>
                        {isLoading ? (
                            <Flex justify="center">
                                <Spinner />
                            </Flex>
                        ) : error ? (
                            <Flex justify="center">
                                <Text>Falha ao obter dados do usuário</Text>
                            </Flex>
                        ) : (
                            <>
                                <TableContainer>
                                    <Table colorScheme="whiteAlpha">
                                        <Thead>
                                            <Tr>
                                                <Th
                                                    px={["4", "4", "6"]}
                                                    color="gray.300"
                                                    width="8"
                                                >
                                                    <Checkbox colorScheme="pink" />
                                                </Th>
                                                <Th>Usuário</Th>
                                                {isWideVersion && (
                                                    <Th>Data de Cadastro</Th>
                                                )}
                                                {isWideVersion && (
                                                    <Th width="8"></Th>
                                                )}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {data.map((user: User) => (
                                                <Tr key={user.id}>
                                                    <Td
                                                        px={["4", "4", "6"]}
                                                        color="gray.300"
                                                        width="8"
                                                    >
                                                        <Checkbox colorScheme="pink" />
                                                    </Td>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="bold">
                                                                {user.name}
                                                            </Text>
                                                            <Text
                                                                fontSize="sm"
                                                                color="gray.300"
                                                            >
                                                                {user.email}
                                                            </Text>
                                                        </Box>
                                                    </Td>
                                                    {isWideVersion && (
                                                        <Td>
                                                            {user.createdAt}
                                                        </Td>
                                                    )}
                                                    {isWideVersion && (
                                                        <Td>
                                                            <Button
                                                                size="sm"
                                                                fontSize="sm"
                                                                colorScheme="purple"
                                                                leftIcon={
                                                                    <Icon
                                                                        as={
                                                                            RiPencilLine
                                                                        }
                                                                    />
                                                                }
                                                            >
                                                                Editar
                                                            </Button>
                                                        </Td>
                                                    )}
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                                <Pagination />
                            </>
                        )}
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
