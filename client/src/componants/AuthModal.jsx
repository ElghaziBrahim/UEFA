import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/componants/ui/dialog";
import { signUpUser, signInUser } from '@/apiFunctions/functions';
import { Button } from "@/componants/ui/button"

const AuthModal = ({ label, fetchUserData }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSignUp) {
            signUpUser(email, password, name)
            setIsSignUp(false)
            setPassword('')
            setName('')
        } else {
            signInUser(email, password)
            console.log(`Signing in with email: ${email} and password: ${password}`);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setEmail('');
        setPassword('');
    };

    return (
        <Dialog>
            <DialogTrigger className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                {label}
            </DialogTrigger>
            <DialogContent className="bg-white rounded-lg shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 mt-2">
                        {isSignUp
                            ? 'Create a new account'
                            : 'Access your account'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {isSignUp && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <button
                    onClick={toggleMode}
                    className="mt-4 text-indigo-500 hover:text-indigo-600 font-semibold transition duration-300 ease-in-out"
                >
                    {isSignUp
                        ? 'Already have an account? Sign In'
                        : 'Don\'t have an account? Sign Up'}
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;