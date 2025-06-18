import type { CountryName } from "../interfaces/country";

export async function convertAmountByCountry(
  amount: number, 
  country: CountryName, 
  fromCurrency: string = 'USD'
): Promise<number> {
  
  const targetCurrency = getCurrencyByCountry(country);
  
  console.log('Debug conversion:', { amount, country, fromCurrency, targetCurrency });
  
  if (fromCurrency.toLowerCase() === targetCurrency.toLowerCase()) {
    return Number(amount.toFixed(2));
  }

  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`
    );
    
    if (!response.ok) {
      throw new Error('Error fetching exchange rates');
    }

    const data = await response.json();
    console.log('API Response:', data); // Ver toda la respuesta
    
    const exchangeRate = data.rates[targetCurrency.toUpperCase()];
    console.log('Exchange rate found:', exchangeRate); // Ver si encuentra la tasa
    
    if (!exchangeRate) {
      throw new Error(`Exchange rate not found for ${targetCurrency}`);
    }

    const convertedAmount = parseFloat((amount * exchangeRate).toFixed(2));
    console.log('Conversion result:', { amount, exchangeRate, convertedAmount });

    return convertedAmount;

  } catch (error) {
    console.error('Currency conversion error:', error);
    return Number(amount.toFixed(2));
  }
}

export function getCurrencyByCountry(country: CountryName): string {
  const currencyMap: Record<CountryName, string> = {
    "Spain": "eur",
    "Germany": "eur", 
    "Peru": "pen",
    "United States": "usd"
  };

  return currencyMap[country] || 'USD';
}

export function getCountryCodeByName(country: CountryName): string {
  const countryCodeMap: Record<CountryName, string> = {
    "Spain": "ES",
    "Germany": "DE", 
    "Peru": "PE",
    "United States": "US"
  };

  return countryCodeMap[country] || 'US';
}

export function getCurrencySymbolByCountry(country: CountryName): string {
  const currencySymbolMap: Record<CountryName, string> = {
    "Spain": "€",
    "Germany": "€", 
    "Peru": "S/",
    "United States": "$"
  };

  return currencySymbolMap[country] || '$';
}