import React from 'react';

export default function PostComments({ comments }) {
    return (
        <div className="comments">
            {comments.map((comment) => (
                <figure key={comment._id}>
                    <img src={comment.user.profile_picture} alt="" />
                    <figcaption>
                        <p className="username">{`${comment.user.first_name} ${comment.user.last_name}`}</p>
                        <p className="content">{comment.content}</p>
                    </figcaption>
                    <p>{comment.timestamp}</p>
                </figure>
            ))}
        </div>
    );
}
