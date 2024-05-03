"use client"
import Link from "next/link";
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Make a request to your server to handle login
      const response = await axios.post("/api/users/login", credentials);
      console.log("User logged in successfully:", response.data);

      // Redirect based on user role
      switch (response.data.user.role) {
        case "admin":
          router.push("/admin");
          break;
        case "creator":
          router.push("/creator");
          break;
        case "user":
          router.push("/profile");
          break;
        default:
          break;
      }

      toast.success("Login success");
    } catch (error: any) {
      console.error("Error logging in:", error);
      // Handle errors (e.g., display error messages to the user)
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(credentials.email.length > 0 && credentials.password.length > 0) {
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
}, [credentials, loading]);
  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h2 className="text-4xl mb-8 font-semibold text-center">
        <p className="font-sans font-bold text-3xl text-600 ">
          <span className="text-white-600">i</span>
          <span className="text-red-800">WATCH</span>
        </p><br />
          Sign In to your Account
        </h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Sign In
            </button>
          </div>
          <div className="text-sm text-center">
            <p>
              Don't have an account?{' '}
              <a href="/register" className="text-red-500 underline">
                Register in now.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
