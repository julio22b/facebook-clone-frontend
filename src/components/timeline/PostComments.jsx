import React from 'react';
import defaultPicture from '../../images/no-profile-picture.png';
import { Link } from 'react-router-dom';

export default function PostComments({ comments }) {
    return (
        <div className="comments">
            {comments.map((comment) => (
                <figure key={comment._id}>
                    <Link to={`/users/${comment.user._id}/profile`}>
                        <img src={comment.user.profile_picture || defaultPicture} alt="" />
                    </Link>
                    <figcaption>
                        <Link to={`/users/${comment.user._id}/profile`}>
                            <p className="username">{`${comment.user.first_name} ${comment.user.last_name}`}</p>
                        </Link>
                        <p className="content">{comment.content}</p>
                    </figcaption>
                    <p className="timestamp">{comment.timestamp}</p>
                </figure>
            ))}
        </div>
    );
}
