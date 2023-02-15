import { useSidebarDrawer } from "@/contexts/sidebar-drawer-context";
import { Flex, IconButton, useBreakpointValue, Icon } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { Logo } from "./logo";
import { NotificationsNav } from "./notifications-nav";
import { Profile } from "./profile";
import { SearchBox } from "./search-box";
export function Header() {
    const { onOpen } = useSidebarDrawer();
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
            {!isWideVersion && (
                <IconButton
                    aria-label="open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    mr="2"
                    onClick={onOpen}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                />
            )}
            <Logo />
            {isMediumVersion && <SearchBox />}
            <Flex align="center" ml="auto">
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}
