export const getDefaultOptions = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json',
  },
  method: 'GET',
};

const api = {
  getCoinMarket: (
    currency: string = 'idr',
    orderBy: string = 'market_cap_desc',
    sparkline: boolean = true,
    priceChangePerc: string = '7d',
    perPage: number = 10,
    page: number = 1,
  ) =>
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`,
      getDefaultOptions,
    ).then((response: any) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    }),
};

export default api;
