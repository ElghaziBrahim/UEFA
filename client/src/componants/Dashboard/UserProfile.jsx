import axios from 'axios';
import { useEffect, useState } from 'react';
import { authUserToken } from '@/apiFunctions/functions';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons"
import { editUser } from '@/apiFunctions/functions';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const UserProfile = () => {
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        const data = await authUserToken(token);
        console.log({ data });
        setFormData({
            email: data.email,
            password: '',
            name: data.name,
            favourite_team: data.favourite_team
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await editUser(formData)
            setIsSubmitting(false);
            fetchUserData();
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (e) => {
        setIsEditing(true);
        e.preventDefault();
    };

    return (
        <Card className="border m-2 border-gray-200 shadow-lg rounded-lg">
            <CardHeader className="bg-blue-500 text-white py-4 px-6 rounded-t-lg">
                <CardTitle className="text-xl font-semibold">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
                        <input
                            disabled={!isEditing}
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                        <input
                            disabled={!isEditing}
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="favourite_team" className="block text-sm font-medium text-gray-700">Favorite Team</Label>
                        <input
                            disabled={!isEditing}
                            value={formData.favourite_team}
                            onChange={handleChange}
                            type="text"
                            id="favourite_team"
                            name="favourite_team"
                            placeholder="Favorite Team"
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    </div>

                    {isEditing ? (
                        <Button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
                            {isSubmitting ? (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    ) : (
                        <Button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block">
                            Edit
                        </Button>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

export default UserProfile;
