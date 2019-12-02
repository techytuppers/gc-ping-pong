import React from 'react';
import DisplayMatch from './DisplayMatch'

class DisplayMatches extends React.Component {
    constructor(){
        super();
    }
    render() {
        console.log("jenny ", this.props.matches)

        const matchComponents = Object.entries(this.props.matches).map((key, value) => {
            const match = {
                matchId : key[0],
                player1 : key[1].player1,
                player2 : key[1].player2,
                player1Score : key[1].player1Score,
                player2Score : key[1].player2Score,
                alreadyScored : key[1].player1Score && key[1].player1Score

            }
            console.log("match ", match)
            return <DisplayMatch match={match}/>
        })
        return (
            <div>
                {matchComponents}
            </div>
        );
    }
}
export default DisplayMatches;