import { Box, Stack, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type NavSectionProps = {
    title: string;
};

export function NavSection({
    title,
    children,
}: PropsWithChildren<NavSectionProps>) {
    return (
        <Box>
            <Text
                fontWeight="bold"
                color="gray.400"
                fontSize="small"
                textTransform="uppercase"
            >
                {title}
            </Text>
            <Stack spacing="4" mt="8" align="stretch">
                {children}
            </Stack>
        </Box>
    );
}
