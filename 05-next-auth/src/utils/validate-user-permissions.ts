type User = {
    permissions: string[];
    roles: string[];
};
type Input = {
    user: User;
    permissions?: string[];
    roles?: string[];
};

export function validateUserPermissions({ user, permissions, roles }: Input) {
    const hasAtLeastOneRole = roles?.some((role) => user?.roles.includes(role));
    if (roles && !hasAtLeastOneRole) return false;
    const hasAllPermissions = permissions?.every((permission) =>
        user?.permissions.includes(permission)
    );
    if (permissions && !hasAllPermissions) return false;

    return true;
}
