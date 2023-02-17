import { useAuth } from "@/contexts/auth-context";
import { validateUserPermissions } from "@/utils/validate-user-permissions";

type UseCanParams = {
    permissions?: string[];
    roles?: string[];
};

export function useCan({ permissions, roles }: UseCanParams): boolean {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return false;

    return validateUserPermissions({ permissions, user: user!, roles });
}
