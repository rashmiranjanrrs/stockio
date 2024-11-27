import React from "react";
import { StockData } from "../types";

interface StockListProps {
  stocks: StockData[];
}

const StockList: React.FC<StockListProps> = ({ stocks }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2">Date</th>
          <th className="px-5 py-3 border-b-2">Open</th>
          <th className="px-5 py-3 border-b-2">High</th>
          <th className="px-5 py-3 border-b-2">Low</th>
          <th className="px-5 py-3 border-b-2">Close</th>
          <th className="px-5 py-3 border-b-2">Volume</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.date}>
            <td className="px-5 py-5 border-b">{stock.date}</td>
            <td className="px-5 py-5 border-b">${stock.open.toFixed(2)}</td>
            <td className="px-5 py-5 border-b">${stock.high.toFixed(2)}</td>
            <td className="px-5 py-5 border-b">${stock.low.toFixed(2)}</td>
            <td className="px-5 py-5 border-b">${stock.close.toFixed(2)}</td>
            <td className="px-5 py-5 border-b">{stock.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StockList;
