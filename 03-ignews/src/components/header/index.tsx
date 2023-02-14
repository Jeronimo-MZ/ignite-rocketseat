import Image from "next/image";
import logoImg from "@/assets/images/logo.svg";

import styles from "./header.module.scss";
import { SignInButton } from "../sign-in-button";
import Link from "next/link";
import { ActiveLink } from "../active-link";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoImg} alt="ig.news" />
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        Home
                    </ActiveLink>
                    <ActiveLink
                        href="/posts"
                        activeClassName={styles.active}
                        prefetch
                    >
                        Posts
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}
