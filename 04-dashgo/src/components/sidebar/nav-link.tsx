import {
    Icon,
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ElementType } from "react";

type NavLinkProps = ChakraLinkProps & {
    icon: ElementType;
    children: string;
    href: string;
};
export function NavLink({ href, icon, children, ...rest }: NavLinkProps) {
    return (
        <ChakraLink
            as={NextLink}
            href={href}
            display="flex"
            alignItems="center"
            {...rest}
        >
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">
                {children}
            </Text>
        </ChakraLink>
    );
}
