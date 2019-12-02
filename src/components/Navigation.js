import React from 'react';
import {
    Link
} from "react-router-dom";
import logo from '../Logo_lockup_001-05.svg';

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul className="mainNavigation">
                    <li className="logo-wrap">
                        <img src={logo} className="logo-image" />
                    </li>
                    <li className="mainNavigation__item">
                        <Link to="/" className="mainNavigation__link">
                            Home
                        </Link>
                    </li>
                    <li className="mainNavigation__item">
                        <Link to="/sign-up" className="mainNavigation__link">
                            Join!
                        </Link>
                    </li>
                    <li className="mainNavigation__item">
                        <Link to="/matches-results" className="mainNavigation__link">
                            Matches and Results
                        </Link>
                    </li>
                    <li className="mainNavigation__item">
                        <Link to="/generate-tournament" className="mainNavigation__link mainNavigation__link--admin">
                            Generate Tournament
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;