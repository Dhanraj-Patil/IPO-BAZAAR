"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import IndividualIpoData from "@/components/Individual/IndividualIpoData";
import Loader from "../../loading"; // Importing Loader component

export default function IPODetailsPage() {
  const [ipoData, setIpoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    async function fetchIPODetails() {
      try {
        const response = await fetch(`/api/getIpoDetails?id=${params.details}`);
        if (!response.ok) {
          throw new Error("Failed to fetch IPO details");
        }
        const data = await response.json();
        setIpoData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    if (params.details) {
      fetchIPODetails();
    }
  }, [params.details]);

  if (isLoading) return <Loader />; // Using Loader component
  if (error) return <div>Error: {error}</div>;
  if (!ipoData) return <div>No IPO details found</div>;

  return (
    <div className="h-full">
      <IndividualIpoData ipoData={ipoData} />
    </div>
  );
}
