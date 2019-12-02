import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import MatchesResults from './components/MatchesResults';

export default function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/matches-results">
            <MatchesResults />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
