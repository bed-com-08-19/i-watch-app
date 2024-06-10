// _components/ChangeProfilePhotoForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ChangeProfilePhotoForm = ({ userId }) => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePhoto', profilePhoto);
        formData.append('userId', userId);

        try {
            await axios.post('/api/pictures/settings/profile-photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Profile photo updated successfully');
        } catch (error) {
            console.error('There was an error updating the profile photo!', error);
            toast.error('Failed to update profile photo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-red-700">
                    New Profile Photo
                </label>
                <input
                    type="file"
                    className="border rounded w-full py-2 px-3 text-white-700"
                    onChange={handlePhotoChange}
                    required
                />
                {preview && <img src={preview} alt="Profile Preview" className="mt-4 w-32 h-32 rounded-full" />}
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Change Profile Photo
            </button>
        </form>
    );
};

export default ChangeProfilePhotoForm;
