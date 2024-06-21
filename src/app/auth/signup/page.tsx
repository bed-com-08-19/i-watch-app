"use client";
import Link from "next/link";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";

interface User {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;  // Added phoneNumber field
}

export default function RegisterPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",  // Initialized phoneNumber field
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    return (
      user.email.length > 0 &&
      user.password.length > 6 &&
      user.username.length > 0 &&
      user.phoneNumber.length >= 10 // Check phoneNumber is at least 10 characters long
    );
  };

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all fields, ensure the password is at least 7 characters long, and the phone number is at least 10 characters long.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Sign up successful!");
      router.push("/auth/signin");
    } catch (error: any) {
      console.error("Signup failed", error);
      if (error.response && error.response.status === 400) {
        toast.error("Access denied, check your credentials");
      } else {
        toast.error("An error occurred during signup. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!validateForm() || loading);
  }, [user, loading]);

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      {loading && <Loader />}
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <p className="font-bold text-3xl text-red-600 hidden sm:block text-center">
          <span className="text-white">i</span>
          <span>WATCH</span>
        </p>
        <h2 className="text-4xl mb-8 font-semibold text-center">
          Create your iWATCH Account
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
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-600"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Full Name"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-600"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm mb-1">
              Phone Number (+265)
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-600"
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
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-600"
              required
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full px-4 py-3 font-bold text-white rounded-md ${
                buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              } focus:outline-none focus:shadow-outline`}
              disabled={buttonDisabled}
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </div>
          <div className="text-sm text-center">
            <p className="tc-grey t-center">
              Already have an account?{" "}
              <Link className="link font-bold" href="/auth/signin">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
