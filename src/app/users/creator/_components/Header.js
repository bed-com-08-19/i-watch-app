import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";  // Importing Select component
import { useRouter } from "next/navigation";

const Header = ({ setSearchTerm }) => {
  const [username, setUsername] = useState("null");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
    fetchCategories();  // fetch categories on component mount
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data.data.map(category => ({ value: category._id, label: category.name })));
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch categories");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/auth/signin");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to logout");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);
  const toggleUploadForm = () => setShowUploadForm(!showUploadForm);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setSearchTerm(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categories", selectedCategories.map(option => option.value).join(','));  // add selected categories

    try {
      await axios.post("/api/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Video uploaded successfully");
      toggleUploadForm();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to upload video");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black py-2 px-4 sm:px-6 lg:px-8 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <p
          className="font-sans font-bold text-3xl text-white hidden md:block cursor-pointer"
          onClick={() => router.push("/users/creator")}
        >
          <span>i</span>
          <span className="text-red-800">WATCH</span>
        </p>

        <nav className="md:flex space-x-4 text-sm md:text-lg">
          <a href="/users/creator" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">HOME</a>
          <a href="/users/creator/trending" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">TRENDING</a>
          <a href="/users/creator/ads" className="text-white hover:text-gray-300 hover:border-red-500 border-b-2 transition duration-300">ADS</a>
        </nav>

        <div className="relative flex items-center">
          <FiSearch
            onClick={toggleSearch}
            className="text-white cursor-pointer hover:text-red-800 transition duration-300"
            size={24}
          />
          {searchOpen && (
            <input
              type="text"
              placeholder="Search videos by title"
              value={searchValue}
              onChange={handleSearchChange}
              className="text-black ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          )}
        </div>

        <div className="relative ml-4">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <Image
              src="/noavatar.png" // Placeholder image path
              alt={username}
              className="w-10 h-10 rounded-full cursor-pointer"
              width={40}
              height={40}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-20">
              <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800" onClick={toggleUploadForm}>Upload</a>
              <a href="/users/creator/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">Profile</a>
              <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showUploadForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-black p-6 rounded-lg w-full max-w-md border-2 border-red-500">
          <h2 className="text-lg font-semibold mb-4 text-white">Upload Video</h2>
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-red-500">
                Video Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Video Title"
                className="mt-1 p-2 block w-full border border-red-500 rounded-md bg-black text-white"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-red-500">
                Video Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Video Description"
                className="mt-1 p-2 block w-full border border-red-500 rounded-md bg-black text-white"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="video" className="block text-sm font-medium text-red-500">
                Upload Video File
              </label>
              <input
                type="file"
                id="video"
                name="video"
                className="mt-1 p-2 block w-full border border-red-500 rounded-md bg-black text-white"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="categories" className="block text-sm font-medium text-red-500">
                Select Categories
              </label>
              <Select
                id="categories"
                isMulti
                options={categories}
                value={selectedCategories}
                onChange={handleCategoryChange}
                className="mt-1"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: 'black',
                    borderColor: 'red',
                    color: 'white'
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: 'black',
                    color: 'white'
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    backgroundColor: 'red',
                    color: 'white'
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: 'white'
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'white'
                  }),
                }}
              />
            </div>
            <div className="flex justify-end">
              <button type="button" className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg" onClick={toggleUploadForm}>Cancel</button>
              <button type="submit" className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">Upload</button>
            </div>
          </form>
        </div>
      </div>      
      )}
    </header>
  );
};

export default Header;
