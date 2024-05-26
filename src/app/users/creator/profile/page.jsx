import React from 'react'
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { FiUpload } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { User} from "@models/userModel";
import { Videos} from "@models/videoModel";
// import "../globals.css"



// const Profile = () => {
  // const user = 
  //   {
  //     id:1,
  //     name: "Chrisprog",
  //     bio: "Frontend developer",
  //     balance: 100,
  //     views: "20k",
  //     likes: "5k",
  //     image: "/profile.jpg"
  //   }

  const Profile = () => {
    const [username, setUsername] = useState("null");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [description, setDescription] = useState("");
  
    useEffect(() => {
      getUserDetails();
    }, []);
  
    const logout = async () => {
      try {
        await axios.get("/api/users/logout");
        toast.success("Logout successful");
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
  
    const toggleUploadForm = () => setShowUploadForm(!showUploadForm);
  
    const handleFileChange = (event) => {
      setVideoFile(event.target.files[0]);
    };
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!videoFile) {
        toast.error("Please select a video file");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", videoFile.name);
      formData.append("description", description);
      formData.append("creator", username);
      formData.append("video", videoFile);
  
      try {
        await axios.post("/api/videos/uploadvideos/videos", formData, {
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
    <main className="flex items-center justify-between pt-4 pr-4">

      {/* side bar navigation */}
      <section className=" sticky flex-1 flex flex-col -mt-80 top-1/2 transform -translate-y-1/2">
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <FiUpload />
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <BiMoneyWithdraw />
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <CiSettings />
        </div>
      </section>

      <section className="">
        <section className="w-full sticky top-0 z-10 section1">
          {/* Profile Header */}
          <div className="flex items-center justify-center w-full  p-4">
            <div className="flex items-center">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden">
                <Image
                  src={user.image || "/noavatar.png"}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            </div>

          </div>

          {/* Money and Views */}
          <div className="flex w-full items-center justify-center font-bold  p-2 text-center text-white">
            <div className="m-4 flex flex-col"><p>MK{user.balance}</p><p className="text-sm text-gray-500 font-thin">Balance</p></div>
            <div className="m-4 flex flex-col"><p>{user.views}</p><p className="text-sm text-gray-500 font-thin">Views</p></div>
            <div className="m-4 flex flex-col"><p>{user.likes}</p><p className="text-sm text-gray-500 font-thin">Likes</p></div>
          </div>

          {/* Divider */}
          <hr className="w-full  border-t-0.5 border-gray-300 my-2" />

        </section>

        {/* User Videos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full  p-4">

          {videos.map((video) => (
            <div key={video.id} className="relative h-48 sm:h-64">
              <video
                className="object-cover w-full h-full"
                src={video.src}
                controls
                autoPlay

              />
            </div>
          ))}

        </div>
      </section>

    </main>
  )
}

export default Profile