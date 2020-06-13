import React, { useState } from 'react';
import authHeader from '../../services/authHeader';

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
                <img src="" alt="" />
                <textarea
                    name="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`What's on your mind, ${username}?`}
                    className="text-input"
                    rows="1"
                ></textarea>
            </div>
            <label htmlFor="image" className="file-input">
                <input
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleFile(e)}
                />
            </label>
            <img src={imagePreview} alt="" />
            <button>Post</button>
        </form>
    );
}
