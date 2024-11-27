export const formatStockData = (data: any) => {
  // Utility function to format raw API data
  return data.map((item: any) => ({
    name: item["1. symbol"],
    description: item["2. name"],
  }));
};
