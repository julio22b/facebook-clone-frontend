import React from 'react';
import './styles/style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInPage from './components/LogInPage/LogInPage';
import Timeline from './components/timeline/Timeline';

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/users/log-in" exact component={LogInPage} />
                    <Route path="/users/:id/timeline" exact component={Timeline} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
