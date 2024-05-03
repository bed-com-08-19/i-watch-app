"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    // username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Sign up successful!");
      router.push("/login"); // Ensure this route exists
    } catch (error: any) {
      console.error("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      // user.username.length > 0 &&
      !loading
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, loading]);
  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        
         {/* logo */}
        <p className="font-bold text-3xl text-red-600 hidden sm:block text-center">
          <span className="text-white">i</span>
          <span className="text">WATCH</span>
        </p>
        <h2 className="text-4xl mb-8 font-semibold text-center">
          Create your Iwatch Account
        </h2>
        <form className="flex flex-col gap-4" onSubmit={onSignup}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </div>
          <div className="text-sm text-center">
            <p className="tc-grey t-center">
              Already have an account?{" "}
              <Link className="link font-bold" href={`/login`}>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
