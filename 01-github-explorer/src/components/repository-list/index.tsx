import { useEffect, useState } from "react";
import { RepositoryItem } from "../repository-item";
import styles from "./styles.module.scss";

type Repository = {
    id: number;
    full_name: string;
    description: string;
    html_url: string;
};
export function RepositoryList() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    useEffect(() => {
        fetch("https://api.github.com/users/jeronimo-mz/repos")
            .then((response) => response.json())
            .then(setRepositories);
    });
    return (
        <section className={styles.repositoryList}>
            <h1>Lista de Repositórios</h1>
            <ul>
                {repositories.map((repo) => (
                    <RepositoryItem
                        key={repo.id}
                        name={repo.full_name}
                        description={repo.description}
                        url={repo.html_url}
                    />
                ))}
            </ul>
        </section>
    );
}
