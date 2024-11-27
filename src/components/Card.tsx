import React from "react";

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-white shadow rounded p-6 mb-4">
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default Card;
