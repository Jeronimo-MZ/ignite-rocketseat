export function formatMoney(amount: number) {
    return Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
    }).format(amount);
}
