import React from 'react';
import DisplayMatch from './DisplayMatch'

class DisplayMatches extends React.Component {
    constructor(){
        super();
    }

    render() {
        console.log("XXX display matches ", this.props.matches.player1score)
        const matchComponents = this.props.matches.map(match => <DisplayMatch 
            player1={match.player1}
            player2={match.player2}
            player1Score={match.player1Score}
            player2Score={match.player2Score}
            alreadyScored={match.alreadyScored}
            matchId={match.matchId}
            week={this.props.week}/>)
        return (
            <div>
                {matchComponents}
            </div>
        );
    }
}
export default DisplayMatches;