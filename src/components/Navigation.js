import React from 'react';
import {
    Link
} from "react-router-dom";

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul className="mainNavigation">
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
                </ul>
            </nav>
        );
    }
}

export default Navigation;