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
import GenerateTournament from './components/GenerateTournament';

export default function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <main className="mainContainer">
          <Switch>
            <Route path="/matches-results">
              <MatchesResults />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/generate-tournament">
              <GenerateTournament />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>This is the homepage</h2>;
}
