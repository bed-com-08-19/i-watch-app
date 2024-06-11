"use client"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader";

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
          router.push("/users/admin");
          break;
        case "creator":
          router.push("/users/creator");
          break;
        case "user":
          router.push("/users/regular");
          break;
        default:
          break;
      }

      toast.success("Login success");
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle errors (e.g., display error messages to the user)
      const errorMessage = "An error occurred during login.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (credentials.email.length > 0 && credentials.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [credentials]);

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      {loading && <Loader />}
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">

        {/* logo */}
        <p className="font-bold text-3xl text-red-600 hidden sm:block text-center">
          <span className="text-white">i</span>
          <span className="text">WATCH</span>
        </p>

        <h2 className="text-4xl mb-8 font-semibold text-center">
          Sign In to your Account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={onLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
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
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full px-4 py-3 font-bold text-white rounded-md ${
                buttonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700`}
              disabled={buttonDisabled || loading}
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </div>
          <div className="text-sm text-center">
            <p className="tc-grey t-center">
              Don't have an account?{" "}
              <Link className="link font-bold" href={`/auth/signup`}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
