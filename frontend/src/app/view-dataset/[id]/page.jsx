'use client';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import UseAppContext from '@/context/AppContext';

// ── Icons ────────────────────────────────────────────────────────────────────

const DownloadIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ExternalLinkIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const TagIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
);

const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const CalendarIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const ArrowLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
    </svg>
);

const LockIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ── Auth Required Modal ───────────────────────────────────────────────────────

const AuthModal = ({ datasetName, onClose }) => {
    // Close on backdrop click
    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleBackdrop}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-[fadeInUp_0.25s_ease]">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                    <XIcon className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <LockIcon className="w-8 h-8 text-sky-600" />
                </div>

                {/* Text */}
                <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-2">
                    Sign in to Download
                </h2>
                <p className="text-gray-500 text-center text-sm leading-relaxed mb-7">
                    Create a free Waggle account or sign in to download{' '}
                    <span className="font-semibold text-gray-700">"{datasetName}"</span>{' '}
                    and access all datasets.
                </p>

                {/* Buttons */}
                <div className="space-y-3">
                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02]"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition-all"
                    >
                        Create Free Account
                    </Link>
                </div>

                <p className="text-xs text-gray-400 text-center mt-5">
                    Free forever · No credit card required
                </p>
            </div>
        </div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────

const ViewDataset = () => {
    const { id } = useParams();
    const router = useRouter();
    const { loggedIn, authLoading } = UseAppContext();

    const [dataset, setDataset] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchDataset = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dataset/getbyid/${id}`);
                    setDataset(response.data);
                } catch (err) {
                    console.error("Failed to fetch dataset:", err);
                    setDataset(null);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDataset();
        }
    }, [id]);

    const handleDownload = () => {
        // Guard: must be logged in
        if (!loggedIn) {
            setShowAuthModal(true);
            return;
        }
        if (!dataset?.downloadUrl) return;

        setDownloading(true);
        setTimeout(() => {
            window.open(dataset.downloadUrl, '_blank', 'noopener,noreferrer');
            setDownloading(false);
        }, 600);
    };

    // ── Loading ──────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-sky-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-sky-500 animate-spin"></div>
                </div>
                <p className="text-gray-400 text-sm font-medium">Loading dataset...</p>
            </div>
        );
    }

    // ── Not Found ────────────────────────────────────────────────────────────
    if (!dataset) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center text-gray-800 text-center p-6">
                <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-3xl font-bold text-gray-900">Dataset Not Found</h1>
                    <p className="text-gray-500 mt-2 max-w-md mx-auto">The dataset you are looking for does not exist or has been removed.</p>
                    <Link href="/browse-dataset" className="mt-6 inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Explore Datasets
                    </Link>
                </div>
            </div>
        );
    }

    // ── Page ─────────────────────────────────────────────────────────────────
    return (
        <>
            {/* Auth Modal */}
            {showAuthModal && (
                <AuthModal
                    datasetName={dataset.name}
                    onClose={() => setShowAuthModal(false)}
                />
            )}

            <div className="bg-gray-50 min-h-screen text-gray-800">
                <main className="pt-24 container mx-auto px-6 pb-20 max-w-5xl">

                    {/* ── Back Link ── */}
                    <Link href="/browse-dataset"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sky-600 transition-colors mb-8 font-medium">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Explore Datasets
                    </Link>

                    {/* ── Cover Image ── */}
                    {dataset.cover && (
                        <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-xl border border-gray-200 group">
                            <img
                                src={dataset.cover}
                                alt={dataset.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <span className="absolute bottom-5 left-5 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                                {dataset.category}
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* ── Left: Main Content ── */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Header */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 leading-tight">
                                    {dataset.name}
                                </h1>
                                <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <TagIcon className="w-4 h-4 text-sky-500" />
                                        <span className="font-semibold text-gray-700">{dataset.category}</span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <UserIcon className="w-4 h-4 text-sky-500" />
                                        <span>by <span className="font-semibold text-gray-700">{dataset.owner?.name || 'Unknown'}</span></span>
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-4 h-4 text-sky-500" />
                                        <span>{new Date(dataset.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                                    About this Dataset
                                </h2>
                                <div className="prose prose-sm max-w-none text-gray-700
                                    prose-headings:font-bold prose-headings:text-gray-900
                                    prose-h2:text-xl prose-h3:text-base
                                    prose-table:text-sm prose-td:py-1.5 prose-th:py-1.5
                                    prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                                    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                                    prose-strong:text-gray-900">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {dataset.description || 'No description provided.'}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Sidebar ── */}
                        <div className="space-y-5">

                            {/* Download Card */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-1">Download Dataset</h3>

                                {/* Login hint for guests — only shown after auth is hydrated */}
                                {!authLoading && !loggedIn && (
                                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4 mt-2">
                                        <LockIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-xs text-amber-700 leading-snug">
                                            <span className="font-semibold">Sign in required</span> — You must be logged in to download datasets.
                                        </p>
                                    </div>
                                )}

                                <p className="text-xs text-gray-400 mb-5">
                                    You will be redirected to the official source page to download this dataset.
                                </p>

                                {dataset.downloadUrl ? (
                                    <>
                                        <button
                                            id="download-dataset-btn"
                                            onClick={handleDownload}
                                            disabled={downloading}
                                            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold px-5 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                                        >
                                            {downloading ? (
                                                <>
                                                    <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Opening...
                                                </>
                                            ) : (
                                                <>
                                                    {(!authLoading && !loggedIn) ? <LockIcon className="w-5 h-5" /> : <DownloadIcon className="w-5 h-5" />}
                                                    {(!authLoading && !loggedIn) ? 'Sign In to Download' : 'Download Dataset'}
                                                </>
                                            )}
                                        </button>

                                        {loggedIn && (
                                            <a
                                                href={dataset.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-sky-600 transition-colors py-2 rounded-xl border border-gray-200 hover:border-sky-200 hover:bg-sky-50"
                                            >
                                                <ExternalLinkIcon className="w-4 h-4" />
                                                View Source Page
                                            </a>
                                        )}

                                        {!loggedIn && (
                                            <p className="text-xs text-center text-gray-400 mt-3">
                                                Don't have an account?{' '}
                                                <Link href="/signup" className="text-sky-600 hover:underline font-semibold">
                                                    Sign up free
                                                </Link>
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full flex flex-col items-center justify-center gap-2 bg-gray-50 border border-dashed border-gray-200 text-gray-400 font-semibold px-5 py-6 rounded-xl text-sm text-center">
                                        <DownloadIcon className="w-8 h-8 text-gray-300" />
                                        Download link not available
                                    </div>
                                )}
                            </div>

                            {/* Dataset Info Card */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Dataset Info</h3>
                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between items-start gap-3">
                                        <dt className="text-gray-500 shrink-0">Category</dt>
                                        <dd className="font-semibold text-gray-800 text-right">{dataset.category}</dd>
                                    </div>
                                    <div className="border-t border-gray-50" />
                                    <div className="flex justify-between items-start gap-3">
                                        <dt className="text-gray-500 shrink-0">Owner</dt>
                                        <dd className="font-semibold text-gray-800 text-right">{dataset.owner?.name || 'Unknown'}</dd>
                                    </div>
                                    <div className="border-t border-gray-50" />
                                    <div className="flex justify-between items-start gap-3">
                                        <dt className="text-gray-500 shrink-0">Added</dt>
                                        <dd className="font-semibold text-gray-800 text-right">
                                            {new Date(dataset.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </dd>
                                    </div>
                                    <div className="border-t border-gray-50" />
                                    <div className="flex justify-between items-start gap-3">
                                        <dt className="text-gray-500 shrink-0">Dataset ID</dt>
                                        <dd className="font-mono text-xs text-gray-400 text-right break-all">{dataset._id}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Browse More */}
                            <div className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100 rounded-2xl p-6">
                                <p className="text-sm font-bold text-sky-800 mb-1">Looking for more?</p>
                                <p className="text-xs text-sky-600 mb-4">Browse our full collection of CV datasets filtered by category.</p>
                                <Link
                                    href="/browse-dataset"
                                    className="block text-center text-sm font-bold text-sky-700 hover:text-sky-900 bg-white border border-sky-200 hover:border-sky-400 px-4 py-2.5 rounded-xl transition-all hover:shadow-sm"
                                >
                                    Explore All Datasets →
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ViewDataset;
