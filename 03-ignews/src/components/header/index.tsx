import Image from "next/image";
import logoImg from "@/assets/images/logo.svg";

import styles from "./header.module.scss";
import { SignInButton } from "../sign-in-button";
import Link from "next/link";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoImg} alt="ig.news" />
                <nav>
                    <Link href="/" className={styles.active}>
                        Home
                    </Link>
                    <Link href="/posts" prefetch>
                        Posts
                    </Link>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
