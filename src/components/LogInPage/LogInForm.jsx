import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LogInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);

    const history = useHistory();

    const logIn = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password,
        };
        try {
            const response = await fetch('http://localhost:4000/users/log-in', {
                method: 'post',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const user = await response.json();
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
                history.push(`/users/${user.user_id}/timeline`);
            } else if (user.message) {
                setErrors(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="log-in-wrapper">
            <form className="log-in-form" onSubmit={(e) => logIn(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        minLength="8"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button>Log in</button>
            </form>
            {errors && <p>Password and/or email are incorrect.</p>}
        </div>
    );
}
