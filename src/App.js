import React, { useEffect, useState } from 'react';
import './styles/style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInPage from './components/LogInPage/LogInPage';
import Timeline from './components/timeline/Timeline';
import Profile from './components/profile/Profile';
import headers from './services/headers';

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        const loggedInUserID = JSON.parse(localStorage.getItem('user')).user_id;
        const getUserInfo = async () => {
            const response = await fetch(`http://localhost:4000/users/${loggedInUserID}`, {
                mode: 'cors',
                headers: headers(),
            });
            const user = await response.json();
            setLoggedInUser(user);
        };

        getUserInfo();
    }, []);
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/users/log-in" exact component={LogInPage} />
                    <Route path="/users/:id/timeline" exact component={Timeline} />
                    <Route
                        path="/users/:id/profile"
                        exact
                        render={(props) => <Profile {...props} currentUser={loggedInUser} />}
                    />
                </Switch>
            </Router>
        </>
    );
}

export default App;
