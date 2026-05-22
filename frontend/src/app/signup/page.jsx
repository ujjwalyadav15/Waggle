'use client';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';

// Inlined SVG components for icons
const IconEye = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
    <path d="M21 12c-2.4 4 -5.4 6 -9 6s-6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6s6.6 2 9 6"></path>
  </svg>
);

const IconEyeOff = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
    <path d="M3 3l18 18"></path>
  </svg>
);

// Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Password is required'),
});

const SignupPage = () => {
  const router = useRouter();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // ...existing submit logic...
    },
  });

  const handleGoogleSuccess = (credentialResponse) => {
    // ...existing Google success logic...
  };
  const handleGoogleError = () => {
    // ...existing Google error logic...
  };

  return (
    <GoogleOAuthProvider clientId="818482412676-01dk4t48avi3tiklieh96ktt9trdbsgt.apps.googleusercontent.com">
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-16">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-500">Create Your Waggle Account</h1>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{' '}
                <Link className="text-sky-500 hover:underline font-semibold" href="/login">
                  Log In
                </Link>
              </p>
            </div>
            <div className="mb-4 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
                width="320px"
                logo_alignment="center"
              />
            </div>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6">
              Or
            </div>
            <form onSubmit={signupForm.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...signupForm.getFieldProps('name')}
                    className="py-3 px-4 block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-800 text-sm focus:border-sky-500 focus:ring-sky-500 transition-colors"
                    placeholder=""
                  />
                  {signupForm.touched.name && signupForm.errors.name ? (
                    <p className="text-xs text-red-500 mt-2">{signupForm.errors.name}</p>
                  ) : null}
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...signupForm.getFieldProps('email')}
                    className="py-3 px-4 block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-800 text-sm focus:border-sky-500 focus:ring-sky-500 transition-colors"
                    placeholder=""
                  />
                  {signupForm.touched.email && signupForm.errors.email ? (
                    <p className="text-xs text-red-500 mt-2">{signupForm.errors.email}</p>
                  ) : null}
                </div>
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm mb-2 font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={passwordHidden ? 'password' : 'text'}
                      id="password"
                      {...signupForm.getFieldProps('password')}
                      className="py-3 px-4 block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-800 text-sm focus:border-sky-500 focus:ring-sky-500 transition-colors"
                      placeholder=""
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordHidden(!passwordHidden)}
                      className="absolute top-0 right-0 p-3.5 rounded-e-md text-gray-400 hover:text-sky-500 transition-colors"
                    >
                      {passwordHidden ? <IconEye /> : <IconEyeOff />}
                    </button>
                  </div>
                  {signupForm.touched.password && signupForm.errors.password ? (
                    <p className="text-xs text-red-500 mt-2">{signupForm.errors.password}</p>
                  ) : null}
                </div>
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm mb-2 font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={confirmPasswordHidden ? 'password' : 'text'}
                      id="confirmPassword"
                      {...signupForm.getFieldProps('confirmPassword')}
                      className="py-3 px-4 block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-800 text-sm focus:border-sky-500 focus:ring-sky-500 transition-colors"
                      placeholder=""
                    />
                    <button
                      type="button"
                      onClick={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
                      className="absolute top-0 right-0 p-3.5 rounded-e-md text-gray-400 hover:text-sky-500 transition-colors"
                    >
                      {confirmPasswordHidden ? <IconEye /> : <IconEyeOff />}
                    </button>
                  </div>
                  {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword ? (
                    <p className="text-xs text-red-500 mt-2">{signupForm.errors.confirmPassword}</p>
                  ) : null}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={signupForm.isSubmitting}
                  className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-lg border border-transparent bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {signupForm.isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>

  );
};

export default SignupPage;

