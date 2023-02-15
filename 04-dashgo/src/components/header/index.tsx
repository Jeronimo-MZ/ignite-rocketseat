import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { Logo } from "./logo";
import { NotificationsNav } from "./notifications-nav";
import { Profile } from "./profile";
import { SearchBox } from "./search-box";
export function Header() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const isMediumVersion = useBreakpointValue({
        base: false,
        md: true,
    });
    return (
        <Flex
            as="header"
            w="100%"
            maxW={1480}
            h="20"
            mx="auto"
            mt="4"
            align="center"
            px="6"
        >
            <Logo />
            {isMediumVersion && <SearchBox />}
            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}
