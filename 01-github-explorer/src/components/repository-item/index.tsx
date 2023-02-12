type RepositoryItemProps = {
    name: string;
    url: string;
    description: string;
};

export function RepositoryItem({
    name,
    url,
    description,
}: RepositoryItemProps) {
    return (
        <li>
            <strong>{name}</strong>
            <p>{description}</p>
            <a href={url}>Acessar Repositório</a>
        </li>
    );
}
