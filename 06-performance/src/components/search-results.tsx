import { ProductItem } from "./product-item";
import { List as _List, ListProps, ListRowRenderer } from "react-virtualized";

const List = _List as unknown as React.FC<ListProps>;

type SearchResultsProps = {
    results: Array<{
        id: number;
        title: string;
        price: number;
        formattedPrice: string;
    }>;
    totalPrice: number;
    onAddToWishlist: (id: number) => void;
};

export function SearchResults({
    results,
    onAddToWishlist,
    totalPrice,
}: SearchResultsProps) {
    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem
                    product={results[index]}
                    onAddToWishlist={onAddToWishlist}
                />
            </div>
        );
    };
    return (
        <div>
            <h2>{totalPrice}</h2>
            <List
                height={300}
                rowHeight={20}
                width={800}
                overscanColumnCount={5}
                rowCount={results.length}
                rowRenderer={rowRenderer}
            />
        </div>
    );
}
