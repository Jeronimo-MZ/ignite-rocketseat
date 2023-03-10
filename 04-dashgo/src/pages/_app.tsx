import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { SidebarDrawerProvider } from "@/contexts/sidebar-drawer-context";
import { makeServer } from "@/services/mirage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/services/query-client";

if (process.env.NODE_ENV === "development") {
    makeServer();
}
export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SidebarDrawerProvider>
                    <Component {...pageProps} />
                </SidebarDrawerProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ChakraProvider>
    );
}
