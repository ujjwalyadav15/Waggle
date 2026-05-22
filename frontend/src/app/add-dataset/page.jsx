'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import UseAppContext from '@/context/AppContext';

const DatasetSchema = Yup.object().shape({
    name: Yup.string().required('Dataset name is required').min(3, 'Too short!'),
    description: Yup.string(),
    category: Yup.string().required('Category is required'),
    downloadUrl: Yup.string().url('Must be a valid URL (e.g. https://...)').nullable(),
});

const categories = ["Image Classification", "Object Detection", "Medical Imaging", "Autonomous Vehicles", "Satellite Imagery", "Other"];

// Updated preview component for the modal with a light theme
const ModalPreview = ({ name, description, coverImage, category }) => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden w-full max-w-2xl mx-auto flex flex-col md:flex-row shadow-2xl">
        <div className="md:w-1/3 flex-shrink-0">
            {coverImage ? (
                <img src={coverImage} alt={name || 'Dataset preview'} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 p-8">No Image</div>
            )}
        </div>
        <div className="p-6 flex flex-col flex-grow md:w-2/3">
            <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded self-start mb-2 font-semibold">
                {category || 'No Category'}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 truncate">{name || 'Untitled Dataset'}</h2>
            <div className="text-gray-600 text-sm flex-grow h-64 overflow-y-auto markdown-content prose prose-sm max-w-none pr-2">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description || 'No description provided.'}
                </ReactMarkdown>
            </div>
        </div>
    </div>
);


const AddDatasetPage = () => {
    const router = useRouter();
    const { loggedIn } = UseAppContext();
    const [isUploading, setIsUploading] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    // Auth guard — redirect guests to login
    useEffect(() => {
        // Wait one tick for AppContext to hydrate from localStorage
        const timer = setTimeout(() => {
            if (!loggedIn) {
                toast.error('You must be signed in to create a dataset.');
                router.replace('/login');
            } else {
                setAuthChecked(true);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [loggedIn, router]);

    // Show spinner while auth state is being determined
    if (!authChecked) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center gap-4">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-sky-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-sky-500 animate-spin"></div>
                </div>
                <p className="text-gray-400 text-sm">Checking authentication...</p>
            </div>
        );
    }

    const datasetForm = useFormik({
        initialValues: { name: '', description: '', cover: '', category: '', downloadUrl: '' },
        validationSchema: DatasetSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                toast.error('You must be logged in to create a dataset.');
                router.push('/login');
                return;
            }
            try {
                await axios.post('http://localhost:5000/dataset/add', values, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                toast.success('Dataset created successfully!');
                resetForm();
                router.push('/browse-datasets');
            } catch (error) {
                toast.error('Failed to create dataset.');
            } finally {
                setSubmitting(false);
            }
        },
    });
    
    const uploadFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cloud_name', 'dcryx8rwt');
        formData.append('upload_preset', 'waggle');
        axios.post('https://api.cloudinary.com/v1_1/dcryx8rwt/image/upload', formData)
            .then((result) => {
                toast.success('Image Uploaded Successfully');
                datasetForm.setFieldValue('cover', result.data.secure_url);
            }).finally(() => setIsUploading(false));
    };

    return (
        <>
            <div className="bg-gray-50 min-h-screen text-gray-800">
                <main className="pt-32 container mx-auto px-6 pb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 mb-2">Create a New Dataset</h1>
                            <p className="text-gray-500 mb-8">A dataset is a container for your images and videos. You can upload files to it after it's created.</p>
                            
                            <form onSubmit={datasetForm.handleSubmit}>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm mb-2 font-semibold text-gray-700">Dataset Name</label>
                                        <input type="text" id="name" {...datasetForm.getFieldProps('name')} className="py-3 px-4 block w-full bg-gray-100 border-gray-300 rounded-lg text-gray-900 focus:border-sky-500 focus:ring-sky-500" placeholder="e.g., Cat vs. Dog Images" />
                                        {datasetForm.touched.name && datasetForm.errors.name ? (<p className="text-xs text-red-600 mt-2">{datasetForm.errors.name}</p>) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="category" className="block text-sm mb-2 font-semibold text-gray-700">Category</label>
                                        <select id="category" {...datasetForm.getFieldProps('category')} className="py-3 px-4 block w-full bg-gray-100 border-gray-300 rounded-lg text-gray-900 focus:border-sky-500 focus:ring-sky-500">
                                            <option value="" label="Select a category" />
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        {datasetForm.touched.category && datasetForm.errors.category ? (<p className="text-xs text-red-600 mt-2">{datasetForm.errors.category}</p>) : null}
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm mb-2 font-semibold text-gray-700">Description (Markdown Supported)</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <textarea id="description" rows="8" {...datasetForm.getFieldProps('description')} className="py-3 px-4 block w-full bg-gray-100 border-gray-300 rounded-lg text-gray-900 font-mono focus:border-sky-500 focus:ring-sky-500" placeholder="A brief description..."></textarea>
                                            <div className="bg-gray-100/50 p-4 rounded-lg border border-gray-200">
                                                <h4 className="text-sm font-semibold text-gray-500 mb-2 border-b border-gray-200 pb-2">Preview</h4>
                                                <div className="prose prose-sm max-w-none markdown-content">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{datasetForm.values.description || "Start typing..."}</ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2 font-semibold text-gray-700">Cover Image (Optional)</label>
                                        {isUploading ? (<p>Uploading...</p>) : datasetForm.values.cover ? (<img src={datasetForm.values.cover} alt="Preview" className="rounded-lg max-h-48 mt-2" />) : (
                                            <input type="file" onChange={uploadFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200" />
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="downloadUrl" className="block text-sm mb-2 font-semibold text-gray-700">Download URL (Optional)</label>
                                        <input
                                            type="url"
                                            id="downloadUrl"
                                            {...datasetForm.getFieldProps('downloadUrl')}
                                            className="py-3 px-4 block w-full bg-gray-100 border-gray-300 rounded-lg text-gray-900 focus:border-sky-500 focus:ring-sky-500"
                                            placeholder="https://example.com/dataset-download"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Link to the official download or source page for this dataset.</p>
                                        {datasetForm.touched.downloadUrl && datasetForm.errors.downloadUrl ? (
                                            <p className="text-xs text-red-600 mt-1">{datasetForm.errors.downloadUrl}</p>
                                        ) : null}
                                    </div>
                                    
                                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => setShowPreviewModal(true)}
                                            className="w-full py-3 px-4 font-bold rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                                        >
                                            Preview Card
                                        </button>
                                        <button
                                            type="submit" disabled={datasetForm.isSubmitting || isUploading}
                                            className="w-full py-3 px-4 font-bold rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 disabled:opacity-50"
                                        >
                                            {datasetForm.isSubmitting ? 'Creating...' : 'Create Dataset'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>

            {showPreviewModal && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative">
                        <ModalPreview 
                            name={datasetForm.values.name}
                            description={datasetForm.values.description}
                            coverImage={datasetForm.values.cover}
                            category={datasetForm.values.category}
                        />
                        <button 
                            onClick={() => setShowPreviewModal(false)}
                            className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg shadow-lg hover:bg-gray-200"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddDatasetPage;

