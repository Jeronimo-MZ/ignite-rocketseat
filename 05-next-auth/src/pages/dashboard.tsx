import { Can } from "@/components/can";
import { useAuth } from "@/contexts/auth-context";
import { setupApiClient } from "@/services/api";
import { withSSRAuth } from "@/utils/with-ssr-auth";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <>
            <h1>Dashboard: {user?.email}</h1>
            <Can permissions={["metrics.list"]}>
                <p>Métricas</p>
            </Can>
        </>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const api = setupApiClient(ctx);
    const response = await api.get("/me");
    console.log(response.data);
    return {
        props: {},
    };
});
