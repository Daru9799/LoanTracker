import dayjs from "dayjs";

export function formatDate(date: string|undefined) {
    if (!date) {
        return 'TBD';
    }
    const parsed = dayjs(date)
    const day = String(parsed.date()).padStart(2, '0');
    const month = String(parsed.month() + 1).padStart(2, '0');
    return `${day}.${month}`;
}
