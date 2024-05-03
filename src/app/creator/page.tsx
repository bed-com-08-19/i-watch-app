"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function StudentProfile({ params }: any) {
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>This is a Content creator's</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
      </p>

      {/* Logout Button */}
      <Link href="/login" onClick={logout}>
        <button className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </Link>
    </div>
  );
}
