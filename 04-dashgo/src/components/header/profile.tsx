import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

type ProfileProps = {
    showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Jerónimo Matavel</Text>
                    <Text color="gray.300" fontSize="small">
                        mataveljeronimo@gmail.com
                    </Text>
                </Box>
            )}
            <Avatar
                size="md"
                name="Jerónimo Matavel"
                src="https://github.com/jeronimo-mz.png"
            />
        </Flex>
    );
}
