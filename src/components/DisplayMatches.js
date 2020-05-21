import React from 'react';
import DisplayMatch from './DisplayMatch'

class DisplayMatches extends React.Component {
    constructor(){
        super();
    }

    render() {
        const matchComponents = this.props.matches.map(match => <DisplayMatch match={match} week={this.props.week}/>)
        return (
            <div>
                {matchComponents}
            </div>
        );
    }
}
export default DisplayMatches;