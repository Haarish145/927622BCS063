const API_KEY = 'demo'; // Use your own API key if available
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchStockPrice(symbol) {
  const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data['Time Series (Daily)']) {
      return data['Time Series (Daily)'];
    } else {
      throw new Error('Invalid data from API');
    }
  } catch (error) {
    console.error('Error fetching stock price:', error);
    return null;
  }
}
