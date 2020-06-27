import React from 'react';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Map from './Map';
import facebookLogo from '../../images/facebook-logo.png';
import { Redirect } from 'react-router-dom';
export default function LogInHeader({ authenticated }) {
    if (authenticated.message) {
        return <Redirect to={`/users/${authenticated.user_id}/timeline`} />;
    }

    return (
        <>
            <header className="log-in-page-header">
                <div>
                    <img src={facebookLogo} alt="facebook-logo" className="facebook-logo" />
                </div>
                <LogInForm />
            </header>
            <section className="sign-up-map-container">
                <Map />
                <SignUpForm />
            </section>
        </>
    );
}
