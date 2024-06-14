"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../../../../../components/Footer";
import { toast } from "react-hot-toast";
import axios from "axios";

interface Ad {
  _id: string;
  title: string;
  description: string;
  adUrl: string;
}

const AdsPage = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get("/api/ads");
      setAds(response.data.data);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
      toast.error("Failed to fetch ads");
      setError("Failed to fetch ads");
    }
  };

  const handleViewAd = (adId: string) => {
    toast.success("Viewing Ad!");
  };


  if (error) return <div className="text-center mt-8">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-red-800 mb-6">Ads Page</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ads.map((ad) => (
              <div key={ad._id} className="relative group p-4 border rounded-lg shadow-md bg-grey-900">
                <img
                  src={ad.adUrl}
                  alt={ad.title}
                  className="object-cover w-full h-48 rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{ad.title}</h2>
                <p className="text-gray-600 mb-4">{ad.description}</p>
                <div className="flex justify-between">
                
                  <button
                    onClick={() => handleViewAd(ad._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-200"
                  >
                    View Ad
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdsPage;
