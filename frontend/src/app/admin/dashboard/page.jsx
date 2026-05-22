'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const AdminDashboardPage = () => {
    const [datasets, setDatasets] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Fetch all datasets and all users in parallel
                const [datasetsResponse, usersResponse] = await Promise.all([
                    axios.get('http://localhost:5000/dataset/getall'),
                    axios.get('http://localhost:5000/user/getall')
                ]);
                setDatasets(datasetsResponse.data);
                setTotalUsers(usersResponse.data.length);
            } catch (err) {
                console.error("Failed to fetch admin data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <div className="animated-background min-h-screen text-white">
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-amber-400">Waggle [Admin]</Link>
                    <nav className="flex items-center space-x-6">
                        <Link href="/admin/dashboard" className="font-semibold text-amber-500 border-b-2 border-amber-500">Dashboard</Link>
                        {/* Future admin links can go here */}
                    </nav>
                </div>
            </header>

            <main className="pt-32 container mx-auto px-6 pb-16">
                <h1 className="text-4xl font-bold text-amber-400 mb-8">Admin Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-slate-400 text-sm font-semibold">TOTAL DATASETS</h3>
                        <p className="text-3xl font-bold text-white">{isLoading ? '...' : datasets.length}</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-slate-400 text-sm font-semibold">TOTAL USERS</h3>
                        <p className="text-3xl font-bold text-white">{isLoading ? '...' : totalUsers}</p>
                    </div>
                </div>

                {/* Datasets List */}
                <div>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {datasets.map((dataset) => (
                                <div key={dataset._id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-2 truncate">{dataset.name}</h2>
                                        <p className="text-slate-400 text-sm mb-4">{dataset.description || 'No description.'}</p>
                                        <p className="text-xs text-slate-500 font-mono" title="Owner ID">
                                            Owner: {dataset.owner}
                                        </p>
                                    </div>
                                    <div className="text-right mt-4">
                                        <Link 
                                            href={`/datasets/${dataset._id}`} 
                                            className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded-md text-sm font-bold transition-colors"
                                        >
                                            Manage
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardPage;

