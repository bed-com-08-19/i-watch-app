"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Header from '../_components/Header';
import Footer from '../../../../components/Footer';

interface Ad {
  _id: string;
  url: string;
}

const AdsPage: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await axios.get("/api/ads");
      const ads: Ad[] = res.data.data;
      setAds(ads);
    } catch (error) {
      toast.error("Failed to fetch ads");
    }
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        {ads.length === 0 ? (
          <div className="text-center text-white">
            <p>No ads available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ads.map((ad) => (
              <div key={ad._id} className="relative h-48 sm:h-64">
                <video
                  className="object-cover w-full h-full"
                  src={ad.url}
                  controls
                />
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default AdsPage;
