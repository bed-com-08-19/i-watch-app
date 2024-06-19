// pages/settings.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangeUsernameForm from '../_components/ChangeUsernameForm';
import ChangeProfilePhotoForm from '../_components/ChangeProfilePhotoForm';
import { toast } from "react-hot-toast";
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";

const Settings = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            setUserId(res.data.userId);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to fetch user details");
        }
    };

    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showProfilePhotoForm, setShowProfilePhotoForm] = useState(false);

    return (
        <div className="container mx-auto p-4 bg-black text-white">
            <div className="absolute top-4 left-4 flex space-x-4">
                <a href="/users/regular"><FiHome /></a>
                <a href="/users/regular/profile"><BiArrowBack /></a>
            </div>
            <h2 className="text-2xl mb-4 ">Settings</h2>
            <div className="mb-4">
                <button
                    onClick={() => setShowUsernameForm(!showUsernameForm)}
                    className="bg-white text-black py-2 px-4 rounded w-56 hover:bg-gray-400"
                >
                    {showUsernameForm ? 'Hide Change Username' : 'Change Username'}
                </button>
                {showUsernameForm && <ChangeUsernameForm userId={userId} />}
            </div>
            <div className="mb-4">
                <button
                    onClick={() => setShowProfilePhotoForm(!showProfilePhotoForm)}
                    className="bg-white text-black py-2 px-4 rounded w-56 hover:bg-gray-400"
                >
                    {showProfilePhotoForm ? 'Hide Change Profile Photo' : 'Change Profile Photo'}
                </button>
                {showProfilePhotoForm && <ChangeProfilePhotoForm userId={userId} />}
            </div>
        </div>
    );
};

export default Settings;
