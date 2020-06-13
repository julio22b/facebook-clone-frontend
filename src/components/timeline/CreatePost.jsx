import React, { useState } from 'react';
import authHeader from '../../services/authHeader';

export default function CreatePost({ username, profile_picture, user_id }) {
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
        console.log(response);
        const data = await response.json();
        console.log(data);
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
        <section className="posts">
            <form className="create-post" onSubmit={(e) => postCreate(e)}>
                <div>
                    <img src="" alt="" />
                    <input
                        type="text"
                        name="content"
                        required
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What's on your mind, ${username}?`}
                    />
                    <input
                        type="file"
                        name="image"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => handleFile(e)}
                    />
                </div>
                <img src={imagePreview} alt="" />
                <button>Create post</button>
            </form>
        </section>
    );
}
