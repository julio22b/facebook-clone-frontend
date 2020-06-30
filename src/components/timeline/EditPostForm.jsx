import React, { useState } from 'react';
import headers from '../../services/headers';

export default function EditPostForm({
    oldContent,
    showEditForm,
    setShowEditForm,
    post_id,
    setPostContent,
}) {
    const [content, setContent] = useState(oldContent || '');
    const editPost = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/posts/${post_id}`, {
                method: 'put',
                mode: 'cors',
                headers: headers(),
                body: JSON.stringify({ content }),
            });

            // eslint-disable-next-line no-unused-vars
            const data = await response.json();
            if (response.status === 200) {
                setShowEditForm(!showEditForm);
                setPostContent(content);
            }
        } catch (err) {
            console.error(err);
        }
    };
    if (showEditForm) {
        return (
            <form className="post-edit-form" onSubmit={(e) => editPost(e)}>
                <input
                    type="text"
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                />
                <button>Edit Post</button>
            </form>
        );
    }
    return <></>;
}
