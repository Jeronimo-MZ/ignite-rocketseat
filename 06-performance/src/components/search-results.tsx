import { useMemo } from "react";
import { ProductItem } from "./product-item";

type SearchResultsProps = {
    results: Array<{
        id: number;
        title: string;
        price: number;
    }>;
    onAddToWishlist: (id: number) => void;
};

export function SearchResults({
    results,
    onAddToWishlist,
}: SearchResultsProps) {
    const totalPrice = useMemo(() => {
        return results.reduce((total, product) => total + product.price, 0);
    }, [results]);
    return (
        <div>
            <h2>{totalPrice}</h2>
            {results.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    onAddToWishlist={onAddToWishlist}
                />
            ))}
        </div>
    );
}
