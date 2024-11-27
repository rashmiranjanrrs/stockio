import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-xl font-semibold mb-2">
        <Skeleton width={100} />
      </h3>
      <p className="text-gray-600">
        <Skeleton width={80} />
      </p>
      <p className="mt-2">
        <Skeleton width={60} />
      </p>
    </div>
  );
};

export default SkeletonCard;
