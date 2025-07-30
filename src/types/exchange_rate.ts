export interface ExchangeRate {
    date: string;
    base: string;
    rates: {
        [currencyCode: string]: number;
    };
}