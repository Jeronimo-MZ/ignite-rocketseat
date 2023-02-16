import {
    Icon,
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ElementType } from "react";

type NavLinkProps = ChakraLinkProps & {
    icon: ElementType;
    children: string;
    href: string;
    matchExact?: boolean;
};
export function NavLink({
    href,
    icon,
    children,
    matchExact = false,
    ...rest
}: NavLinkProps) {
    const { pathname } = useRouter();

    let isActive = matchExact
        ? [href, rest.as].includes(pathname)
        : pathname.startsWith(href) || pathname.startsWith(String(rest.as));

    return (
        <ChakraLink
            as={NextLink}
            href={href}
            display="flex"
            alignItems="center"
            color={isActive ? "pink.400" : "gray.50"}
            {...rest}
        >
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">
                {children}
            </Text>
        </ChakraLink>
    );
}
