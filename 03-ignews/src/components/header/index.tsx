import Image from "next/image";
import logoImg from "@/assets/images/logo.svg";

import styles from "./header.module.scss";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoImg} alt="ig.news" />
                <nav>
                    <a href="" className={styles.active}>
                        Home
                    </a>
                    <a href="">Posts</a>
                </nav>
            </div>
        </header>
    );
}
