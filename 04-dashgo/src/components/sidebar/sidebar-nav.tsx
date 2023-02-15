import { Stack } from "@chakra-ui/react";
import {
    RiContactsLine,
    RiDashboardLine,
    RiGitMergeLine,
    RiInputMethodLine,
} from "react-icons/ri";
import { NavLink } from "./nav-link";
import { NavSection } from "./nav-section";

export function SidebarNav() {
    return (
        <Stack spacing="12" alignSelf="flex-start">
            <NavSection title="Geral">
                <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
                <NavLink icon={RiContactsLine}>Usuários</NavLink>
            </NavSection>
            <NavSection title="Automação">
                <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
                <NavLink icon={RiGitMergeLine}>Automação</NavLink>
            </NavSection>
        </Stack>
    );
}
