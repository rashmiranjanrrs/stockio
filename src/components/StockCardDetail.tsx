import React from "react";
import { StockData } from "../types";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartLine,
  FaDollarSign,
  FaExchangeAlt,
} from "react-icons/fa";

interface StockCardDetailProps {
  stock: StockData;
}

const StockCardDetail: React.FC<StockCardDetailProps> = ({ stock }) => {
  const priceChange = stock.close - stock.open;
  const isPositive = priceChange >= 0;
  const bgGradient = isPositive
    ? "bg-gradient-to-r from-[#000000] to-[#04941c]"
    : "bg-gradient-to-r from-[#000000] to-[#b20000]";
  const textColor = "text-white";
  const arrowIcon = isPositive ? (
    <FaArrowUp className="text-green-200" />
  ) : (
    <FaArrowDown className="text-red-200" />
  );

  return (
    <div
      className={`w-full rounded-xl shadow-lg transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-[1.02]  custom-shadow`}
    >
      <div
        className={`flex items-center justify-between py-4 px-5 rounded-t-xl ${bgGradient}`}
      >
        <h3 className={`text-1xl font-bold text-white`}>{stock.symbol}</h3>
        <div className="text-1xl text-white">{arrowIcon}</div>
      </div>

      <div className="px-6 py-3 bg-[#2b2b2b] rounded-b-xl">
        <p className={`mt-2 ${textColor} flex items-center text-sm`}>
          <FaChartLine className="mr-2" />
          Date: {stock.date}
        </p>

        <div className="flex justify-between mt-4">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <FaDollarSign className="mr-2 text-white" />
              <span className={`${textColor} text-sm`}>
                Open: ${stock.open.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <FaDollarSign className="mr-2 text-white" />
              <span className={`${textColor} text-sm`}>
                Close: ${stock.close.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <FaDollarSign className="mr-2 text-white" />
              <span className={`${textColor} text-sm`}>
                High: ${stock.high.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <FaDollarSign className="mr-2 text-white" />
              <span className={`${textColor} text-sm`}>
                Low: ${stock.low.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <p className={`mt-4 ${textColor} flex items-center text-sm`}>
          <FaExchangeAlt className="mr-2 text-white" />
          Volume: {stock.volume.toLocaleString()}
        </p>

        <p
          className={`mt-4 text-1xl font-semibold ${textColor} flex items-center`}
        >
          {arrowIcon}
          <span className="ml-2">
            {priceChange.toFixed(2)} (
            {((priceChange / stock.open) * 100).toFixed(2)}%)
          </span>
        </p>
      </div>
    </div>
  );
};

export default StockCardDetail;
