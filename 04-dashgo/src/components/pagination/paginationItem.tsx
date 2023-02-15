import { Button } from "@chakra-ui/react";

type PaginationItemProps = {
    isCurrent?: boolean;
    number: number;
};

export function PaginationItem({
    isCurrent = false,
    number,
}: PaginationItemProps) {
    const props = isCurrent ? currentItemProps : defaultProps;
    return (
        <Button size="sm" fontSize="xs" colorScheme="pink" width="4" {...props}>
            {number}
        </Button>
    );
}

const defaultProps = {
    bgColor: "gray.700",
    _hover: { bgColor: "gray.500" },
} as const;

const currentItemProps = {
    disabled: true,
    _disabled: { bgColor: "pink.500", cursor: "default" },
} as const;
