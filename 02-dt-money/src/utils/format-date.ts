export function formatDate(date: Date | string) {
    return Intl.DateTimeFormat("pt-BR").format(new Date(date));
}
