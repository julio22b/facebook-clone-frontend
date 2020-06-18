import React, { useState } from 'react';
import headers from '../../services/headers';

export default function EditProfileForm({
    showEditForm,
    image,
    cover,
    userBio,
    userFirstName,
    userLastName,
    handleClick,
    currentUser,
}) {
    const [profile_picture, setProfile_picture] = useState(image);
    const [cover_photo, setCover_photo] = useState(cover);
    const [bio, setBio] = useState(userBio || '');
    const [first_name, setFirst_name] = useState(userFirstName || '');
    const [last_name, setLast_name] = useState(userLastName || '');
    const [imagePreview, setImagePreview] = useState('');
    const [coverPhotoPreview, setCoverPhotoPreview] = useState('');
    const [errors, setErrors] = useState([]);
    const [btnText, setBtnText] = useState('Edit your profile');

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                profile_picture: profile_picture || '',
                cover_photo: cover_photo || '',
                bio,
                first_name,
                last_name,
            };
            const response = await fetch(`http://localhost:4000/users/${currentUser}/profile`, {
                method: 'put',
                mode: 'cors',
                headers: headers(),
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            setBtnText(data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            if (response.status === 400) {
                setErrors(data);
                window.scrollTo(0, 0);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleFile = (e, setPic, setPreview) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPic(reader.result);
        };
        console.log(reader);
    };

    return (
        <>
            <form
                className={showEditForm ? 'edit-form active' : 'edit-form'}
                onSubmit={(e) => updateProfile(e)}
            >
                {errors.length > 0 && (
                    <ul className="errors">
                        {errors.map((error) => (
                            <li key={error.msg}>{error.msg}</li>
                        ))}
                    </ul>
                )}
                <h2>
                    Edit Profile{' '}
                    <button type="button" onClick={handleClick}>
                        X
                    </button>
                </h2>
                <div>
                    <div>
                        <label htmlFor="profile_picture">Profile Picture</label>
                        Edit
                        <input
                            type="file"
                            name="profile_picture"
                            defaultValue={profile_picture}
                            onChange={(e) => handleFile(e, setProfile_picture, setImagePreview)}
                        />
                    </div>
                    <div>
                        <img src={imagePreview} alt="" className="profile-picture-preview" />
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="cover_photo">Cover Photo</label>
                        Edit
                        <input
                            type="file"
                            name="cover_photo"
                            defaultValue={cover_photo}
                            onChange={(e) => handleFile(e, setCover_photo, setCoverPhotoPreview)}
                        />
                    </div>
                    <div>
                        <img src={coverPhotoPreview} alt="" className="cover-photo-preview" />
                    </div>
                </div>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        required
                        defaultValue={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        required
                        defaultValue={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        name="bio"
                        cols="40"
                        rows="5"
                        defaultValue={bio}
                        maxLength="101"
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
                <button>{btnText}</button>
            </form>
        </>
    );
}
