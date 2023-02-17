import { memo } from "react";

type ProductItemProps = {
    product: {
        id: number;
        price: number;
        title: string;
    };
};

function ProductItemComponent({ product }: ProductItemProps) {
    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
        </div>
    );
}

export const ProductItem = memo(ProductItemComponent, (prev, next) => {
    return Object.is(prev.product, next.product);
});
