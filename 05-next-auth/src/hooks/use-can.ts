import { useAuth } from "@/contexts/auth-context";

type UseCanParams = {
    permissions?: string[];
    roles?: string[];
};

export function useCan({
    permissions = [],
    roles = [],
}: UseCanParams): boolean {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return false;

    const hasAtLeastOnePermission = roles.some((role) =>
        user?.roles.includes(role)
    );
    const hasAllPermissions = permissions.every((permission) =>
        user?.permissions.includes(permission)
    );

    return hasAllPermissions && hasAtLeastOnePermission;
}
