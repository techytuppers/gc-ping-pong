import React from 'react';
import {
    Link
} from "react-router-dom";

class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/sign-up">Signup</Link>
                    </li>
                    <li>
                        <Link to="/matches-results">Matches and Results</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;