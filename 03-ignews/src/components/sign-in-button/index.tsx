import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
export function SignInButton() {
    const isUserLoggedIn = false;
    if (isUserLoggedIn) {
        return (
            <button className={styles.container}>
                <FaGithub color="#04d361" /> Jerónimo Matavel
                <FiX />
            </button>
        );
    }
    return (
        <button className={styles.container}>
            <FaGithub color="#eba417" /> Sign in with Github
        </button>
    );
}
