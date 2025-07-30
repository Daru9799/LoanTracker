import { Currency } from "@/src/types/currency";
import { ExchangeRate } from "@/src/types/exchange_rate";
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

export const useExchangeRateList = (baseCurrency: string) => {
    return useQuery<ExchangeRate>({
        queryKey: ['rates', baseCurrency],
        queryFn: async () => {
            const response = await fetch(`https://api.vatcomply.com/rates?base=${baseCurrency}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data as ExchangeRate;
        },
        staleTime: 1000 * 60 * 60, //cache co godzine
    })
}