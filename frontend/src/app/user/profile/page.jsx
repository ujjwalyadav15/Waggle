"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setError("You must be logged in to view your profile.");
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:5000/user/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch profile.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center mb-6 text-4xl text-sky-600 font-bold">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <h1 className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500">
            {user.name}
          </h1>
          <div className="text-gray-500 mb-6">{user.email}</div>
          <div className="w-full flex flex-col gap-4 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">User ID:</span>
              <span className="break-all">{user._id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold">Joined:</span>
              <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</span>
            </div>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
