import { useAuth } from "@/contexts/auth-context";

type UseCanParams = {
    permissions?: string[];
    roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams): boolean {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return false;

    const hasAtLeastOneRole = roles?.some((role) => user?.roles.includes(role));
    if (roles && !hasAtLeastOneRole) return false;
    const hasAllPermissions = permissions?.every((permission) =>
        user?.permissions.includes(permission)
    );
    if (permissions && !hasAllPermissions) return false;

    return true;
}
