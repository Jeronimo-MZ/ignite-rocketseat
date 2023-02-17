import { useAuth } from "@/contexts/auth-context";
import { useCan } from "@/hooks/use-can";
import { setupApiClient } from "@/services/api";
import { withSSRAuth } from "@/utils/with-ssr-auth";

export default function Dashboard() {
    const { user } = useAuth();

    const userCanSeeMetrics = useCan({ roles: ["editor", "administrator"] });
    return (
        <>
            <h1>Dashboard: {user?.email}</h1>
            {userCanSeeMetrics && <p>Métricas</p>}
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
