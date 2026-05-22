'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Pre-defined categories
const categories = [
    "Image Classification",
    "Object Detection",
    "Medical Imaging",
    "Autonomous Vehicles",
    "Satellite Imagery",
    "Other"
];

const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);


export default function BrowseDatasetsPage() {
    const [datasets, setDatasets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchDatasets = async () => {
            setIsLoading(true);
            try {
                const url = selectedCategory === 'All'
                    ? `${process.env.NEXT_PUBLIC_API_URL}/dataset/getall`
                    : `${process.env.NEXT_PUBLIC_API_URL}/dataset/getbycategory/${selectedCategory}`;
                const response = await axios.get(url);
                setDatasets(response.data);
            } catch (err) {
                console.error("Failed to fetch datasets:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDatasets();
    }, [selectedCategory]);

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
            <main className="pt-32 container mx-auto px-6 pb-16">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 mb-4">Explore Datasets</h1>
                <p className="text-gray-500 mb-8">Filter datasets by category to find what you need.</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === 'All' ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedCategory === cat ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div>
                    {isLoading ? (
                        <div className="flex justify-center p-16"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div></div>
                    ) : datasets.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                            No datasets found for the category: "{selectedCategory}".
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {datasets.map((dataset) => (
                                <Link key={dataset._id} href={`/view-dataset/${dataset._id}`} className="block bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                                    <div className="relative">
                                        {/* Corrected to use coverImage to match the database model */}
                                        {dataset.cover ? (
                                            <img src={dataset.cover} alt={dataset.name} className="w-full h-48 object-cover" />
                                        ) : (
                                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-sky-600 font-semibold mb-1">{dataset.category}</p>
                                        <h2 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-sky-600 transition-colors">{dataset.name}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <UserIcon />
                                            <span>{dataset.owner?.name || 'Unknown User'}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

