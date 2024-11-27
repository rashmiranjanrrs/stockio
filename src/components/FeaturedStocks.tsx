import React, { useEffect, useState } from "react";
import { getFeaturedStocks } from "../services/remoteApi";
import { StockData } from "../types";
import StockCard from "./StockCard";
import { Link } from "react-router-dom";

const FeaturedStocks: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getFeaturedStocks();
        setStocks(data);
      } catch (error) {
        console.error("Failed to fetch featured stocks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading featured stocks...</p>;
  }

  return (
    <section id="features" className="container mx-auto px-6 py-12">
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h2
            className="text-2xl font-bold text-center text-white"
            data-aos="fade-up"
          >
            Featured Stocks
          </h2>
        </div>
        <div>
          <Link
            to={"/search"}
            className="text-1xl text-center text-white underline"
            data-aos="fade-up"
          >
            more
          </Link>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => (
          <div data-aos="zoom-in" key={stock.symbol}>
            <StockCard stock={stock} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStocks;
