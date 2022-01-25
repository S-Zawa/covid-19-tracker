export type Data = {
    confirmed: { value: number };
    recovered: { value: number };
    deaths: { value: number };
    lastUpdate?: Date;
    country: string;
};

export type DailyData = {
    confirmed: { total: number };
    deaths: { total: number };
    reportDate: string;
};

type County = {
    name: string;
};

export type CountryData = {
    countries: County[];
};