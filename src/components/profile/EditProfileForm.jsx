import React from 'react';

export default function EditProfileForm() {
    return (
        <form>
            <h2>
                Edit Profile <button type="button">X</button>
            </h2>
            <div>
                <label htmlFor="profile_picture">Profile Picture</label>
                <div>
                    Edit
                    <input type="file" />
                </div>
            </div>
            <div>
                <label htmlFor="cover_photo">Cover Photo</label>
                <div>
                    Edit
                    <input type="file" />
                </div>
            </div>
            <div>
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" cols="30" rows="10"></textarea>
            </div>
        </form>
    );
}
