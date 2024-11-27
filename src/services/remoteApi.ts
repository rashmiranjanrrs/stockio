import axios from "axios";
import resultData from "../featured.json";
import { StockData } from "../types";
import { ResultData, GlobalQuote } from "../types/resultData";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || "C83C4QKKD8NLTIHL";
const SEARCH_API_KEY =
  process.env.SEARCH_ALPHA_VANTAGE_API_KEY || "F1VRNBCJ5LYSOQTJ"; //for limit exceeded
const BASE_URL = "https://www.alphavantage.co/query";

export const getGlobalQuote = async (symbol: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`API Error for symbol ${symbol}:`, error);
    throw error;
  }
};

export const getStockTimeSeries = async (symbol: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol,
        apikey: SEARCH_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getFeaturedStocks = async (): Promise<StockData[]> => {
  const symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NVDA"];
  const promises = symbols.map(async (symbol) => {
    try {
      const data = await getGlobalQuote(symbol);
      const quote = data["Global Quote"];

      if (!quote || Object.keys(quote).length === 0) {
        throw new Error("Global Quote not available");
      }

      return {
        symbol: quote["01. symbol"],
        date: quote["07. latest trading day"],
        open: parseFloat(quote["02. open"]),
        high: parseFloat(quote["03. high"]),
        low: parseFloat(quote["04. low"]),
        close: parseFloat(quote["05. price"]),
        volume: parseInt(quote["06. volume"], 10),
        change: parseFloat(quote["09. change"]),
        changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
      };
    } catch (error) {
      console.warn(`Falling back to local data for symbol ${symbol}`);

      // Get the data from result.json
      const localData: ResultData = resultData as ResultData;
      const symbolData = localData[symbol];

      if (symbolData && symbolData["Global Quote"]) {
        const quote: GlobalQuote = symbolData["Global Quote"];
        return {
          symbol: quote["01. symbol"],
          date: quote["07. latest trading day"],
          open: parseFloat(quote["02. open"]),
          high: parseFloat(quote["03. high"]),
          low: parseFloat(quote["04. low"]),
          close: parseFloat(quote["05. price"]),
          volume: parseInt(quote["06. volume"], 10),
          change: parseFloat(quote["09. change"]),
          changePercent: parseFloat(
            quote["10. change percent"].replace("%", "")
          ),
        };
      } else {
        console.error(`No local data available for symbol ${symbol}`);
        throw new Error(`No data available for symbol ${symbol}`);
      }
    }
  });

  // Wait for all promises to resolve
  const results = await Promise.all(promises);
  return results;
};
