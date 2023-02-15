import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Jerónimo Matavel</Text>
                <Text color="gray.300" fontSize="small">
                    mataveljeronimo@gmail.com
                </Text>
            </Box>
            <Avatar
                size="md"
                name="Jerónimo Matavel"
                src="https://github.com/jeronimo-mz.png"
            />
        </Flex>
    );
}
