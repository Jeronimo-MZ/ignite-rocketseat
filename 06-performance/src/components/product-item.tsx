import { memo } from "react";

type ProductItemProps = {
    product: {
        id: number;
        price: number;
        title: string;
    };
    onAddToWishlist: (id: number) => void;
};

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
            <button onClick={() => onAddToWishlist(product.id)}>
                Add to wishlist
            </button>
        </div>
    );
}

export const ProductItem = memo(ProductItemComponent, (prev, next) => {
    return Object.is(prev.product, next.product);
});
