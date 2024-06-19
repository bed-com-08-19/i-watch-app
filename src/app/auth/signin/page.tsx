"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState, useEffect, FormEvent } from "react";
import Loader from "../../../components/Loader";

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    role: string;
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post<LoginResponse>("/api/users/login", credentials);

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
          toast.error("Unknown user role");
          break;
      }

      toast.success("User login successful");
    } catch (error: any) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Access denied, check your credentials");
      } else {
        toast.error("An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(credentials.email.length === 0 || credentials.password.length === 0);
  }, [credentials]);

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      {loading && <Loader />}
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <p className="font-bold text-3xl text-red-500 hidden sm:block text-center">
          <span className="text-white">i</span>
          <span>WATCH</span>
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
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-600"
              required
              aria-label="Email"
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
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500"
              required
              aria-label="Password"
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full px-4 py-3 font-bold text-white rounded-md ${
                buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              } focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700`}
              disabled={buttonDisabled || loading}
              aria-label="Sign In"
            >
              {loading ? "Processing..." : "Sign In"}
            </button>
          </div>
          <div className="text-sm text-center mt-4">
            <Link className="text-red-500 hover:underline" href="/auth/forgot-password" passHref>
              Forgot Password?
            </Link>
          </div>
          <div className="text-sm text-center mt-4">
            <p className="tc-grey t-center">
              Don't have an account?{" "}
              <Link className="link font-bold bg-red" href="/auth/signup" passHref>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}