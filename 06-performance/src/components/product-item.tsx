import dynamic from "next/dynamic";
import { memo, useState } from "react";

const AddProductToWishlist = dynamic(
    () =>
        import("./add-product-to-wishlist").then(
            (mod) => mod.AddProductToWishlist
        ),
    { loading: () => <span>Carregando</span> }
);

type ProductItemProps = {
    product: {
        id: number;
        price: number;
        title: string;
        formattedPrice: string;
    };
    onAddToWishlist: (id: number) => void;
};

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
    return (
        <div>
            {product.title} - <strong>{product.formattedPrice}</strong>
            <button onClick={() => setIsAddingToWishlist(true)}>
                Adicionar aos favoritos
            </button>
            {isAddingToWishlist && (
                <AddProductToWishlist
                    onAddToWishlist={() => onAddToWishlist(product.id)}
                    onRequestClose={() => setIsAddingToWishlist(false)}
                />
            )}
        </div>
    );
}

export const ProductItem = memo(ProductItemComponent, (prev, next) => {
    return Object.is(prev.product, next.product);
});
