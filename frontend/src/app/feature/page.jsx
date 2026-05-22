import React from 'react';
import Link from 'next/link';

// Inlined SVG Icons for consistency and performance
const UploadCloud = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
);
const Zap = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);
const GitBranch = (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="3" x2="6" y2="15"></line>
          <circle cx="18" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
);
const PlaySquare = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
    </svg>
);
const TerminalSquare = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 11 2-2-2-2"></path>
        <path d="M11 13h4"></path>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
);
const Users = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <path d="M20 8v6"></path>
        <path d="M23 11h-6"></path>
    </svg>
);

// A reusable component for each feature section
const FeatureSection = ({ icon, title, children, reverse = false }) => (
  <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="md:w-1/2 flex justify-center p-8">
      <div className="bg-sky-100 w-48 h-48 rounded-full flex items-center justify-center shadow-lg">
        {React.cloneElement(icon, { className: "w-24 h-24 text-sky-600" })}
      </div>
    </div>
    <div className="md:w-1/2">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="text-gray-700 space-y-4 text-lg">
        {children}
      </div>
    </div>
  </div>
);

export default function FeaturesPage() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <main className="pt-24">
        {/* Page Header */}
        <section className="container mx-auto px-6 pt-16 pb-12 text-center">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#e0f2fe,transparent)]"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500">Platform Features</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
            Discover the powerful tools Waggle provides to accelerate your computer vision projects.
          </p>
        </section>

        {/* Detailed Features */}
        <section className="container mx-auto px-6 py-16 space-y-24">
          <FeatureSection icon={<UploadCloud />} title="Resilient, Large-Scale Uploads">
            <p>Say goodbye to failed uploads. Our chunk-based uploader is built to handle massive datasets, even with unstable connections. Upload terabytes of data directly from your browser or via our CLI.</p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Drag-and-drop web interface</li>
              <li>Command-line tool for automation</li>
              <li>Automatic resume on interruption</li>
            </ul>
          </FeatureSection>
          
          <FeatureSection icon={<Zap />} title="Automated Data Processing" reverse={true}>
            <p>Once your data is uploaded, Waggle's automated pipeline takes over. We process your raw files into analysis-ready formats, so you can focus on your models, not on data prep.</p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Thumbnail generation for quick previews</li>
              <li>Video transcoding to HLS for smooth streaming</li>
              <li>Metadata extraction (dimensions, duration, etc.)</li>
            </ul>
          </FeatureSection>

          <FeatureSection icon={<GitBranch />} title="Git-Like Dataset Versioning">
            <p>Ensure 100% reproducibility for your experiments. Every change, addition, or deletion creates a new, immutable version of your dataset, allowing you to track your data's lineage with precision.</p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Create and switch between versions instantly</li>
              <li>Compare differences between versions</li>
              <li>Link specific model results to a dataset version</li>
            </ul>
          </FeatureSection>

          <FeatureSection icon={<PlaySquare />} title="Interactive Gallery & Video Player" reverse={true}>
            <p>Don't just store your data—explore it. Our interactive gallery and high-performance video player let you visually inspect your datasets, identify issues, and gain insights before writing a single line of code.</p>
          </FeatureSection>
          
          <FeatureSection icon={<TerminalSquare />} title="Integrated Notebook Environment">
            <p>Bridge the gap between data and experimentation. Launch a pre-configured Jupyter notebook environment with one click, with your selected dataset version mounted and ready to be used.</p>
          </FeatureSection>

          <FeatureSection icon={<Users />} title="Seamless Collaboration and Sharing" reverse={true}>
            <p>AI development is a team sport. Securely share datasets with colleagues, manage permissions with role-based access control, or create public links to share your work with the broader community.</p>
          </FeatureSection>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500">Ready to Streamline Your Workflow?</h2>
          <p className="mt-4 text-lg text-gray-600">Start building better AI today.</p>
          <div className="mt-8">
            <Link href="/signup" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold px-8 py-3 rounded-lg transition-all shadow-lg shadow-sky-500/20 hover:scale-105 text-lg">
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white py-12 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Waggle AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
