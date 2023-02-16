import { Header } from "@/components/header";
import dynamic from "next/dynamic";
import { Sidebar } from "@/components/sidebar";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import Head from "next/head";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: true,
        },
        foreColor: theme.colors.gray[500],
        events: {
            mounted: (chart: any) => {
                chart.windowResizeHandler();
            },
        },
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: "datetime",
        axisBorder: {
            color: theme.colors.gray[600],
        },
        axisTicks: {
            color: theme.colors.gray[600],
        },
        categories: [
            "2023-02-02T00:00:00.000Z",
            "2023-02-03T00:00:00.000Z",
            "2023-02-04T00:00:00.000Z",
            "2023-02-05T00:00:00.000Z",
            "2023-02-06T00:00:00.000Z",
            "2023-02-07T00:00:00.000Z",
            "2023-02-08T00:00:00.000Z",
            "2023-02-09T00:00:00.000Z",
            "2023-02-10T00:00:00.000Z",
            "2023-02-11T00:00:00.000Z",
        ],
    },
    fill: {
        opacity: 0.4,
        type: "gradient",
        gradient: {
            shade: "dark",
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    },
} as const;
const series = [
    {
        name: "series-1",
        data: [31, 120, 10, 28, 61, 30, 54, 192, 54, 65],
    },
];

export default function Dashboard() {
    return (
        <>
            <Head>
                <title>Dashboard | DashGo</title>
            </Head>
            <Flex direction="column" h="100vh">
                <Header />
                <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                    <Sidebar />
                    <SimpleGrid
                        flex="1"
                        gap="4"
                        minChildWidth={["270px", "320px"]}
                        alignSelf="flex-start"
                    >
                        <Box p={["4", "8"]} bg="gray.800" rounded="md">
                            <Text fontSize="lg" mb="4">
                                Inscritos da semana
                            </Text>
                            <Chart
                                type="area"
                                height={160}
                                width="100%"
                                series={series}
                                options={options}
                            />
                        </Box>
                        <Box p="8" bg="gray.800" rounded="md">
                            <Text fontSize="lg" mb="4">
                                Taxa de abertura
                            </Text>
                            <Chart
                                type="area"
                                height={160}
                                width="100%"
                                series={series}
                                options={options}
                            />
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Flex>
        </>
    );
}
