"use client";
import React, { useEffect, useState } from "react";
import Header from "../_components/Header";
import Footer from "../../../../components/Footer";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

interface Ad {
  _id: string;
  title: string;
  description: string;
  adUrl: string;
}

const AdsPage = () => {
  const [ads, setAds] = useState<Ad[]>([]); // Initialize with an empty array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await axios.get("/api/ads"); // Assuming you have an API route to fetch ads
      setAds(response.data.ads || []);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
      toast.error("Failed to fetch ads");
      setError("Failed to fetch ads");
    }
  };

  const handleClickAd = (adId: string) => {
    toast.success("Clicked on Ad!");
    // Here you can add logic to record the ad click or navigate to an ad link
  };

  const handleViewAd = (adId: string) => {
    toast.success("Viewing Ad!");
    // Here you can add logic to record the ad view or display ad details
  };

  if (error) return <div className="text-center mt-8 text-white">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header setSearchTerm={undefined} />
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-red-500 mb-10">Ads Page</h1>
          {Array.isArray(ads) && ads.length === 0 ? (
            <div className="text-center text-gray-400">No Ads Found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ads.map((ad) => (
                <div key={ad._id} className="relative group p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800">
                  <Image
                    src={ad.adUrl}
                    alt={ad.title}
                    className="object-cover w-full h-48 rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2 text-white">{ad.title}</h2>
                  <p className="text-gray-400 mb-4">{ad.description}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleClickAd(ad._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                    >
                      Click Ad
                    </button>
                    <button
                      onClick={() => handleViewAd(ad._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                    >
                      View Ad
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdsPage;
