import React from 'react';
import Authontificate from '../AuthModal';
import { authUserToken } from '@/apiFunctions/functions';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [userData, setUserData] = useState(null);
    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        const data = await authUserToken(token);
        setUserData(data);
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <div className="bg-gray-800 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl text-white font-bold leading-tight">Welcome to UEFA Insights</h1>
                <p className="mt-4 text-lg text-white mb-2">Get insights and statistics about the UEFA Champions League teams, including their performance, match details, and more.</p>
                {
                    userData ? (
                        <button className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                            <Link className="flex-shrink-0" to="/dashboard">
                                Dashboard
                            </Link>
                        </button>
                    ) : (
                        <Authontificate label="Join for More" />
                    )
                }

            </div>
        </div>
    );
};

export default Hero;
