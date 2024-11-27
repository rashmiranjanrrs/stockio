import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedStocks from "../components/FeaturedStocks";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import { getStockTimeSeries } from "../services/remoteApi";
import { StockData } from "../types";
import StockCardDetail from "../components/StockCardDetail";
import SkeletonCard from "../components/SkeletonCard";
import ReactPaginate from "react-paginate";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedStocks />
    </div>
  );
};

export default HomePage;
