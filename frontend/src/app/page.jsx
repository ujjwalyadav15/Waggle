'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';



// --- Icon Components ---
const UploadCloud = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" /><path d="m16 16-4-4-4 4" />
  </svg>
);
const Zap = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const GitBranch = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>
  </svg>
);

// --- Main Homepage Component ---
export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      
<Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative container mx-auto px-6 pt-24 pb-32 text-center">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#e0f2fe,transparent)]"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500 pb-4">
              Your Central Hub for Vision AI
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
              Waggle is the ultimate platform to upload, version, and explore image & video datasets in real-time. Streamline your computer vision workflow from data to model.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/signup" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg shadow-sky-500/20 hover:scale-105 text-lg">
                Get Started for Free
              </Link>
              <Link href="/browse-dataset" className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold px-8 py-4 rounded-lg transition-colors text-lg">
                Explore Datasets
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="feature" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-sky-600 font-semibold text-sm uppercase">Core Features</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Everything You Need, All in One Place</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<UploadCloud className="w-8 h-8 text-sky-600" />}
                title="Large-Scale Uploads"
                description="Effortlessly upload terabytes of image and video data with our resilient, high-speed uploader."
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8 text-sky-600" />}
                title="Automatic Processing"
                description="We handle the heavy lifting. Thumbnails, video previews, and HLS streams are generated automatically."
              />
              <FeatureCard
                icon={<GitBranch className="w-8 h-8 text-sky-600" />}
                title="Dataset Versioning"
                description="Track every change with full reproducibility for your experiments, ensuring consistency and reliability."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Ready to Accelerate Your AI Development?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Create your first dataset in seconds and begin your journey into the future of computer vision.
            </p>
            <div className="mt-8">
              <Link href="/add-dataset" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold px-8 py-3 rounded-lg transition-all shadow-lg shadow-sky-500/20 hover:scale-105 inline-block text-lg">
                Create Your First Dataset
              </Link>
            </div>
          </div>
        </section>
      </main>

   <footer className="bg-white py-8 border-t border-gray-200">
  <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500">
    
    {/* Left Side: Copyright */}
    <p className="text-center md:text-left mb-4 md:mb-0">
      &copy; {new Date().getFullYear()} Waggle AI. All Rights Reserved.
    </p>
    
    {/* Right Side: Email Link */}
    <Link 
      href="mailto:Ujjwalyaduvanshi2@gmail.com" 
      className="hover:text-sky-600 flex items-center"
    >
      <i className="fas fa-envelope"></i>
      <span className="ml-2">Ujjwalyaduvanshi2@gmail.com</span>
    </Link>
    
  </div>
</footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="bg-sky-100 text-sky-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

