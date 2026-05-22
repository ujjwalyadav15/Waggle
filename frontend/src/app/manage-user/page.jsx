"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL for your backend API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

// --- SVG Icons ---
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
);


// Modal for updating a user
const UpdateModal = ({ user, onClose, onUserUpdate }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_URL}/update/${user._id}`, { name, email });
            toast.success('User updated successfully!');
            onUserUpdate(response.data);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Failed to update user.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center transition-opacity duration-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit User</h2>
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main Admin Panel Component
export default function ManageUserPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/getall`);
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch users.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`${API_URL}/delete/${userId}`);
                toast.success('User deleted successfully.');
                setUsers(users.filter(user => user._id !== userId));
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete user.');
            }
        }
    };
    
    const handleUserUpdate = (updatedUser) => {
        setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Admin Panel - Manage Users</h1>
                
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-gray-900 font-medium">{user.name}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-gray-700">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mr-4 font-semibold transition-transform transform hover:scale-110"
                                            >
                                                <EditIcon /> Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold transition-transform transform hover:scale-110"
                                            >
                                                <DeleteIcon /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedUser && (
                    <UpdateModal 
                        user={selectedUser} 
                        onClose={() => setSelectedUser(null)}
                        onUserUpdate={handleUserUpdate}
                    />
                )}
            </div>
        </div>
    );
}
