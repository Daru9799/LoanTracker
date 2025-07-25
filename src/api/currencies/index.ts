import { Currency } from "@/src/types/currency";
import { useQuery } from "@tanstack/react-query";

export const useCurrenciesList = () => {
    return useQuery<Currency[]>({
        queryKey: ['currencies'],
        queryFn: async () => {
            const response = await fetch('https://api.vatcomply.com/currencies');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Record<string, { name: string; symbol: string }> = await response.json();
            return Object.entries(data).map(([code, { name, symbol }]) => ({
                code,
                name,
                symbol,
            }));
        }
    })
}