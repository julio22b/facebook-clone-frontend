import React from 'react';

export default function LogInForm() {
    return (
        <form className="log-in-form">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required minLength="8" />
            </div>
            <button>Log in</button>
        </form>
    );
}
