module.exports = () => {
    const data = {
        products: [],
    };

    for (let i = 1; i <= 1000; i++) {
        data.products.push({
            id: i,
            title: `Camiseta ${i}`,
            price: 1000,
        });
    }

    return data;
};
