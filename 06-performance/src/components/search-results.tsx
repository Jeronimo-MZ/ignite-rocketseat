import { ProductItem } from "./product-item";

type SearchResultsProps = {
    results: Array<{
        id: number;
        title: string;
        price: number;
    }>;
};

export function SearchResults({ results }: SearchResultsProps) {
    return (
        <div>
            {results.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
