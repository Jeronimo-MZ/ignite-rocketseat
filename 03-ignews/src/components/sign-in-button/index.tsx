import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
    const { data, status } = useSession();
    const isUserLoggedIn = status === "authenticated";
    if (isUserLoggedIn) {
        return (
            <button className={styles.container} onClick={() => signOut()}>
                <FaGithub color="#04d361" /> {data?.user?.name}
                <FiX />
            </button>
        );
    }
    return (
        <button className={styles.container} onClick={() => signIn()}>
            <FaGithub color="#eba417" /> Sign in with Github
        </button>
    );
}
