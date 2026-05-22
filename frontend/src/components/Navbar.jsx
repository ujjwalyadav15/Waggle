'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import UseAppContext from '../context/AppContext';

// Inlined SVG for Search Icon
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// Inlined SVG for Logout Icon
const LogoutIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

// Inlined SVG for Profile Icon
const ProfileIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
    </svg>
);

const Navbar = () => {

    const { loggedIn, setLoggedIn, logout } = UseAppContext();
    const router = useRouter();

    useEffect(() => {
        // Check if a token exists in localStorage to determine login state
        const token = localStorage.getItem('authToken');
        if (setLoggedIn) setLoggedIn(!!token);
    }, [setLoggedIn]);

    const handleLogout = () => {
        if (logout) logout();
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-900">
                    Waggle
                </Link>
                <nav className="hidden md:flex items-center space-x-8 text-gray-600">
                    <Link href="/feature" className="hover:text-sky-600 transition-colors">Features</Link>
                    <Link href="/browse-dataset" className="hover:text-sky-600 transition-colors">Explore</Link>
                    {/* <Link href="/pricing" className="hover:text-sky-600 transition-colors">Pricing</Link> */}
                </nav>
                <div className="flex items-center space-x-4">
                    {/* Theme toggle button removed */}
                    <Link href="/search" className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors" title="Search">
                        <SearchIcon />
                    </Link>
                    {loggedIn ? (
                        <>
                            <Link href="/my-dataset" className="text-gray-600 hover:text-sky-600 font-semibold transition-colors">My Datasets</Link>
                            <Link href="/add-dataset" className="text-gray-600 hover:text-sky-600 font-semibold transition-colors">Create</Link>
                            <Link href="/user/profile" className="p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors" title="Profile">
                                <ProfileIcon />
                            </Link>
                            <button onClick={handleLogout} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors" title="Logout">
                                <LogoutIcon />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-sky-600 font-semibold transition-colors">Login</Link>
                            <Link href="/signup" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-bold transition-all">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;

