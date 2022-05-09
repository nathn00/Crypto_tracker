const BASE_URL = 'https://api.coinpaprika.com/v1';
export const coinFetcher = async () => {
  const json = await (await fetch(`${BASE_URL}/coins`)).json();
  const data = json.slice(0, 30);
  return data
};//Home.tsx
export const priceFetcher = async (coinId: string) => {
  const data = await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
  return data;
};//Price.tsx ==> 잠시보류
export const chartFetcher = async (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - (60 * 60 * 24 * 13);
  const data = await (await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
  return data;
};//Chart.tsx