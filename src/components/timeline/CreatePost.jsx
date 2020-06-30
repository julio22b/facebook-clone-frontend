import React, { useState } from 'react';
import authHeader from '../../services/authHeader';
import addPhoto from '../../images/add-photo.png';
import defaultPicture from '../../images/no-profile-picture.png';

export default function CreatePost({ username, profile_picture, user_id, setPosts, socket }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState([]);

    const postCreate = async (e) => {
        e.preventDefault();
        const postData = {
            content,
            image,
            user_id,
        };
        try {
            const response = await fetch('/posts/create', {
                method: 'post',
                mode: 'cors',
                headers: { 'Content-type': 'application/json', Authorization: authHeader() },
                body: JSON.stringify(postData),
            });
            const data = await response.json();
            if (data.errors) {
                setErrors(data.errors);
                return;
            }
            setPosts((posts) => [data.post, ...posts]);
            socket.emit('new_post', data.post);
            setImage('');
            setContent('');
            setImagePreview('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleFile = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    return (
        <form className="create-post" onSubmit={(e) => postCreate(e)}>
            <div>
                <img src={profile_picture || defaultPicture} alt="" className="profile-image" />
                <input
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`What's on your mind, ${username || ''}?`}
                    className="text-input"
                    value={content}
                    autoComplete="off"
                ></input>{' '}
                {/* THS NEEDS TO INCREASE IN HEIGHT AS THE USER TYPES */}
            </div>
            <img src={imagePreview} alt="" className="image-preview" />
            <label htmlFor="image" className="file-input">
                <img src={addPhoto} alt="" />
                Add a photo
                <input
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleFile(e)}
                />
            </label>
            <ul className="errors">
                {errors.map((error) => (
                    <li key={error.msg}>{error.msg}</li>
                ))}
            </ul>
            <button>Post</button>
        </form>
    );
}
