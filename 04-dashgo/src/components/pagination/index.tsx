import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./paginationItem";

type PaginationProps = {
    totalCountOfEntries: number;
    entriesPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
};

const siblingCount = 1;

function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
        .map((_, index) => from + index + 1)
        .filter((page) => page > 0);
}

export function Pagination({
    totalCountOfEntries,
    currentPage = 1,
    entriesPerPage = 10,
    onPageChange,
}: PaginationProps) {
    const lastPage = Math.ceil(totalCountOfEntries / entriesPerPage);
    const previousPages =
        currentPage > 1
            ? generatePagesArray(
                  currentPage - 1 - siblingCount,
                  currentPage - 1
              )
            : [];

    const nextPages =
        currentPage < lastPage
            ? generatePagesArray(
                  currentPage,
                  Math.min(currentPage + siblingCount, lastPage)
              )
            : [];

    console.log({ currentPage, previousPages, nextPages });

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <Text as="strong">0</Text> - <Text as="strong">10</Text> de{" "}
                <Text as="strong">100</Text>
            </Box>
            <HStack spacing="2">
                {currentPage > 1 + siblingCount && (
                    <>
                        <PaginationItem number={1} />
                        {currentPage > 2 + siblingCount && (
                            <Text color="gray.300" width="8" textAlign="center">
                                ...
                            </Text>
                        )}
                    </>
                )}
                {previousPages.map((page) => (
                    <PaginationItem number={page} key={page} />
                ))}
                <PaginationItem number={currentPage} isCurrent />
                {nextPages.map((page) => (
                    <PaginationItem number={page} key={page} />
                ))}
                {currentPage + siblingCount < lastPage && (
                    <>
                        {currentPage + 1 + siblingCount < lastPage && (
                            <Text color="gray.300" width="8" textAlign="center">
                                ...
                            </Text>
                        )}
                        <PaginationItem number={lastPage} />
                    </>
                )}
            </HStack>
        </Stack>
    );
}
