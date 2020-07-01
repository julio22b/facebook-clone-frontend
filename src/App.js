import React, { useEffect, useState } from 'react';
import './styles/style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInPage from './components/LogInPage/LogInPage';
import Timeline from './components/timeline/Timeline';
import Profile from './components/profile/Profile';
import SearchPeople from './components/timeline/SearchPeople';
import headers from './services/headers';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const user = JSON.parse(localStorage.getItem('user')) || '';
    const [authenticated, setAuthenticated] = useState(user || '');
    const user_id = user ? user.user_id : '';

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(`/api/users/${user_id}`, {
                    mode: 'cors',
                    headers: headers(),
                });
                const user = await response.json();
                setLoggedInUser(user);
            } catch (err) {
                console.error(err);
            }
        };
        if (user_id) {
            getUserInfo();
        }
    }, [user_id]);

    const logOut = () => {
        localStorage.removeItem('user');
        setLoggedInUser({});
        setAuthenticated(false);
    };

    return (
        <>
            <Router>
                <Switch>
                    <Route
                        path="/users/log-in"
                        exact
                        render={(props) => <LogInPage {...props} authenticated={authenticated} />}
                    />
                    <PrivateRoute
                        exact
                        path={'/users/:id/timeline'}
                        render={(props) => <Timeline {...props} logOut={logOut} />}
                    />
                    <PrivateRoute
                        exact
                        path={'/users/:id/profile'}
                        render={(props) => (
                            <Profile {...props} currentUser={loggedInUser} logOut={logOut} />
                        )}
                    />
                    <PrivateRoute
                        path="/users/:id/search"
                        exact
                        render={(props) => (
                            <SearchPeople {...props} currentUser={loggedInUser} logOut={logOut} />
                        )}
                    />
                </Switch>
            </Router>
        </>
    );
}

export default App;
