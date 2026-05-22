'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Search Icon
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// User Icon
const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dataset/search/${searchTerm}`);
            setResults(response.data);
        } catch (err) {
            console.error("Search failed:", err);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800">
             {/* The global Navbar from layout.jsx will be displayed here */}
            <main className="pt-32 container mx-auto px-6 pb-16">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 mb-8 text-center">Search Datasets</h1>
                
                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex gap-2 mb-12 max-w-2xl mx-auto">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name or description..."
                        className="flex-grow py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-sky-500 focus:ring-sky-500 shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
                    >
                        <SearchIcon />
                        {isLoading ? '...' : 'Search'}
                    </button>
                </form>

                {/* Results Section */}
                <div>
                    {isLoading ? (
                        <div className="flex justify-center p-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                        </div>
                    ) : hasSearched && results.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                            No datasets found for "{searchTerm}".
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((dataset) => (
                                <Link key={dataset._id} href={`/view-dataset/${dataset._id}`} className="block bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                                    <div className="relative">
                                        {dataset.coverImage ? (
                                            <img src={dataset.coverImage} alt={dataset.name} className="w-full h-48 object-cover" />
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

export default SearchPage;

