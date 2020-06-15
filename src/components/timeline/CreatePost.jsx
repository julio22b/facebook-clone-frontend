import React, { useState } from 'react';
import authHeader from '../../services/authHeader';
import addPhoto from '../../images/add-photo.png';

export default function CreatePost({ username, profile_picture, user_id, setPosts }) {
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    const postCreate = async (e) => {
        e.preventDefault();
        const postData = {
            content,
            image,
            user_id,
        };
        const response = await fetch('http://localhost:4000/posts/create', {
            method: 'post',
            mode: 'cors',
            headers: { 'Content-type': 'application/json', Authorization: authHeader() },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        setPosts((posts) => posts.concat(data.post));
        setImage('');
        setContent('');
    };

    const handleFile = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        console.log(reader);
    };

    return (
        <form className="create-post" onSubmit={(e) => postCreate(e)}>
            <div>
                <img src="" alt="" className="profile-image" />
                <input
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`What's on your mind, ${username}?`}
                    className="text-input"
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
            <button>Post</button>
        </form>
    );
}
