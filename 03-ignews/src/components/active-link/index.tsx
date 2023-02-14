import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type ActiveLinkProps = LinkProps & {
    activeClassName: string;
};
export function ActiveLink({
    activeClassName,
    href,
    ...rest
}: PropsWithChildren<ActiveLinkProps>) {
    const { asPath } = useRouter();

    return (
        <Link
            href={href}
            className={asPath === href ? activeClassName : ""}
            {...rest}
        />
    );
}
