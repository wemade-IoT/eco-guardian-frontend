export interface Country {
  label: CountryName;
  value: string;
  src: string;
}

export type CountryName = "Spain" | "Germany" | "Peru" | "United States";
