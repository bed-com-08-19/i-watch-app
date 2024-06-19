"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/forgot-password", { email });
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h2 className="text-4xl mb-8 font-semibold text-center">
          Forgot Password
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-600"
              required
              aria-label="Email"
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full px-4 py-3 font-bold text-white rounded-md ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              } focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700`}
              disabled={loading}
              aria-label="Reset Password"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </div>
          <div className="text-sm text-center mt-4">
            <Link className="text-red-500 hover:underline" href="/auth/signin" passHref>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

