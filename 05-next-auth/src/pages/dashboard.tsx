import { useAuth } from "@/contexts/auth-context";

export default function Dashboard() {
    const { user } = useAuth();
    return <h1>Dashboard: {user?.email}</h1>;
}
