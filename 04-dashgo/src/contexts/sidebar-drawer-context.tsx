import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useContext } from "react";

type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export const SidebarDrawerProvider = ({ children }: PropsWithChildren) => {
    const disclosure = useDisclosure();
    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    );
};

export function useSidebarDrawer() {
    return useContext(SidebarDrawerContext);
}
