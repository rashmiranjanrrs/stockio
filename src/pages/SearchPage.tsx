import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SearchBar from "../components/SearchBar";
import { getStockTimeSeries } from "../services/remoteApi";
import { StockData } from "../types";
import StockCardDetail from "../components/StockCardDetail";
import SkeletonCard from "../components/SkeletonCard";
import ReactPaginate from "react-paginate";
import StockChart from "../components/StockChart";

const SearchPage = () => {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState<"card" | "chart">("card"); // New state for view

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 6;

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleSearch = async (symbol: string) => {
    setError("");
    setLoading(true);
    setStockData([]);
    try {
      const data = await getStockTimeSeries(symbol);
      const timeSeries = data["Time Series (Daily)"];
      if (timeSeries) {
        const formattedData: StockData[] = Object.keys(timeSeries).map(
          (date) => ({
            id: `${symbol}-${date}`,
            symbol,
            date,
            open: parseFloat(timeSeries[date]["1. open"]),
            high: parseFloat(timeSeries[date]["2. high"]),
            low: parseFloat(timeSeries[date]["3. low"]),
            close: parseFloat(timeSeries[date]["4. close"]),
            volume: parseInt(timeSeries[date]["5. volume"], 10),
          })
        );
        setStockData(formattedData);
      } else {
        setError("No data found for the provided symbol.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
      setCurrentPage(0); // Reset to first page on new search
    }
  };

  // Calculate the displayed items based on pagination
  const pageCount = Math.ceil(stockData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = stockData.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  return (
    <div id="search" className="container mx-auto px-6 py-12">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}

      {loading && (
        <div className="flex flex-col space-y-6">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {!loading && currentItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Stock Data for {stockData[0].symbol}
          </h2>
          <div className="mb-6">
            <nav className="flex">
              <button
                className={`px-4 py-2 mr-2 font-semibold rounded-t ${
                  view === "card"
                    ? "bg-white text-indigo-600"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setView("card")}
              >
                Card View
              </button>
              <button
                className={`px-4 py-2 font-semibold rounded-t ${
                  view === "chart"
                    ? "bg-white text-indigo-600"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setView("chart")}
              >
                Chart View
              </button>
            </nav>
          </div>
          {view === "card" ? (
            <>
              <div className="flex flex-col space-y-6">
                {currentItems.map((stock) => (
                  <StockCardDetail key={stock.id} stock={stock} />
                ))}
              </div>
              {pageCount > 1 && (
                <div className="flex justify-center mt-8 px-[20px]">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={
                      "pagination flex flex-wrap justify-center"
                    }
                    activeClassName={"active"}
                    pageClassName={"mx-1 px-3 py-1 border rounded"}
                    previousClassName={"mx-1 px-3 py-1 border rounded"}
                    nextClassName={"mx-1 px-3 py-1 border rounded"}
                    disabledClassName={"opacity-50 cursor-not-allowed"}
                    activeLinkClassName={"text-white"}
                  />
                </div>
              )}
            </>
          ) : (
            <StockChart stockData={stockData} />
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
