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

export default function UsersList() {
    const isWideVersion = useBreakpointValue({ base: false, lg: true });
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
                                Usuários
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
                                        {isWideVersion && <Th width="8"></Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
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
                                                    Jerónimo Matavel
                                                </Text>
                                                <Text
                                                    fontSize="sm"
                                                    color="gray.300"
                                                >
                                                    mataveljeronimo@gmail.com
                                                </Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && (
                                            <Td>12 de Fevereiro de 2023</Td>
                                        )}
                                        {isWideVersion && (
                                            <Td>
                                                <Button
                                                    size="sm"
                                                    fontSize="sm"
                                                    colorScheme="purple"
                                                    leftIcon={
                                                        <Icon
                                                            as={RiPencilLine}
                                                        />
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            </Td>
                                        )}
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Pagination />
                    </Box>
                </Flex>
            </Box>
        </>
    );
}
