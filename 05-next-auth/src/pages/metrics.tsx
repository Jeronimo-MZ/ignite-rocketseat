import { withSSRAuth } from "@/utils/with-ssr-auth";
import { withSSRGuest } from "@/utils/with-ssr-guest";

export default function Metrics() {
    return (
        <>
            <h1>Metrics</h1>
        </>
    );
}

export const getServerSideProps = withSSRAuth(
    async (ctx) => {
        return {
            props: {},
        };
    },
    {
        roles: ["administrator"],
        permissions: ["metrics.list"],
    }
);
