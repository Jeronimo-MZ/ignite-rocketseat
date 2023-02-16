import { Header } from "@/components/header";
import { Pagination } from "@/components/pagination";
import { Sidebar } from "@/components/sidebar";
import { useUsers } from "@/services/hooks/use-users";
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
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

export default function UsersList() {
    const isWideVersion = useBreakpointValue({ base: false, lg: true });
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isRefetching } = useUsers(page);

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
                                            {data?.users.map((user) => (
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
                                <Pagination
                                    totalCountOfEntries={data?.totalCount ?? 0}
                                    onPageChange={setPage}
                                    currentPage={page}
                                />
                            </>
                        )}
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
