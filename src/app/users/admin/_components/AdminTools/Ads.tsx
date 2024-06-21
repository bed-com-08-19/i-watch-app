"use client";
import React, { useEffect, useState } from "react";
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
  const [newAd, setNewAd] = useState<{ title: string; description: string; adUrl: string }>({
    title: "",
    description: "",
    adUrl: "",
  });
  const [file, setFile] = useState<File | null>(null); // State to hold the selected file
  const [showPopup, setShowPopup] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewAd({ ...newAd, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", newAd.title);
      formData.append("description", newAd.description);

      // Send the FormData object to the backend
      const response = await axios.post("/api/ads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ad uploaded successfully!");
      setNewAd({ title: "", description: "", adUrl: "" });
      setFile(null); // Clear the selected file
      setShowPopup(false); // Close the popup after successful submission
      fetchAds(); // Refresh the ads list
    } catch (error) {
      console.error("Failed to upload ad:", error);
      toast.error("Failed to upload ad");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  if (error) return <div className="text-center mt-8">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-semibold text-white mb-6">Ads Page</h1>

          {/* Button to Open Add New Ad Form Popup */}
          <button
            onClick={togglePopup}
            className="mb-8 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
          >
            Add New Ad
          </button>

          {/* Add New Ad Form Popup */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-semibold text-white mb-4">Add New Ad</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-400 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newAd.title}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-400 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newAd.description}
                      onChange={handleChange}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="file" className="block text-gray-400 mb-1">
                      Ad File
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
                  >
                    Upload Ad
                  </button>
                  <button
                    type="button"
                    onClick={togglePopup}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition duration-200"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Display Ads */}
          {ads.length === 0 ? (
            <div className="text-center text-gray-400">No Ads Found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ads.map((ad) => (
                <div key={ad._id} className="relative group p-4 border rounded-lg shadow-md bg-gray-900">
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdsPage;
