import { useCan } from "@/hooks/use-can";
import { PropsWithChildren } from "react";

type CanProps = {
    permissions?: string[];
    roles?: string[];
};

export function Can({
    children,
    permissions,
    roles,
}: PropsWithChildren<CanProps>) {
    const userCanSeeComponent = useCan({ permissions, roles });

    if (!userCanSeeComponent) return null;

    return <>{children}</>;
}
