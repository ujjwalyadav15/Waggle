"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function MyDatasetPage() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setError("You must be logged in to view your datasets.");
      setLoading(false);
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/dataset/getbyuser/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDatasets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch datasets.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <section className="relative pt-8 pb-16 text-center">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#e0f2fe,transparent)]"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500 pb-4">
              My Uploaded Datasets
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              View and manage all datasets you have uploaded to Waggle.
            </p>
          </div>
        </section>
        {datasets.length === 0 ? (
          <div className="text-gray-500 text-center mt-12">
            You have not uploaded any datasets yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {datasets.map((ds) => (
              <Link
                key={ds._id}
                href={`/view-dataset/${ds._id}`}
                className="block bg-white rounded-2xl shadow hover:shadow-xl p-6 border border-gray-200 transition-all hover:-translate-y-2"
              >
                <h2 className="text-xl font-bold mb-2 text-gray-900 truncate">
                  {ds.name}
                </h2>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {ds.description}
                </p>
                <div className="text-sm text-gray-400 mb-1">
                  Uploaded:{" "}
                  {new Date(ds.createdAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-400">ID: {ds._id}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
