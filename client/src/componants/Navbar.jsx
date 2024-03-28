import React, { useState, useEffect } from 'react';
import { authUserToken, logoutUser } from '@/apiFunctions/functions';
import AuthModal from './AuthModal';
import { Avatar, AvatarFallback, AvatarImage } from "@/componants/ui/avatar"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut } from "@/componants/ui/dropdown-menu"
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [userData, setUserData] = useState(null);
    const [open, setOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        const data = await authUserToken(token);
        console.log({ data })
        setUserData(data);
        if (currentPath != '/' && data === null) {
            navigate("/");
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const logOut = () => {
        logoutUser(fetchUserData)
    }

    return (
        <nav className=" bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link className="flex-shrink-0" to="/">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                    </Link>
                    {userData ? (
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="/profile.png" />
                                    <AvatarFallback>PR</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link onClick={() => setOpen(false)} className='flex justify-between w-full' to="/dashboard">
                                        Dashboard
                                        <DropdownMenuShortcut>
                                            <MdOutlineSpaceDashboard size={20} />
                                        </DropdownMenuShortcut>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>

                                    <div className='flex justify-between w-full' onClick={logOut}>
                                        Logout
                                        <DropdownMenuShortcut>
                                            <IoIosLogOut size={20} />
                                        </DropdownMenuShortcut>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <AuthModal label="login" />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;