import React from "react";
import { StockData } from "../types";

interface StockCardProps {
  stock: StockData;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const changeColor =
    stock.change && stock.change >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-[#080808] shadow rounded p-4 transform transition duration-300 hover:-translate-y-1 hover:scale-105 custom-shadow">
      <h3 className="text-xl font-semibold mb-2 text-white">{stock.symbol}</h3>
      <p className="text-white">Price: ${stock.close.toFixed(2)}</p>
      {stock.change && stock.changePercent && (
        <p className={`mt-2 ${changeColor}`}>
          {stock.change >= 0 ? "▲" : "▼"} {stock.change.toFixed(2)} (
          {stock.changePercent.toFixed(2)}%)
        </p>
      )}
    </div>
  );
};

export default StockCard;
