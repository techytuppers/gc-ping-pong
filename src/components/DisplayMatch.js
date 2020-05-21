import React from 'react';
import * as firebase from 'firebase';

const groupsMap = {
    1 : {
        winner: "A",
        loser: "B"
    },
    2 : {

    }
}

class DisplayMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            player1: props.match.player1,
            player2: props.match.player2,
            player1Score: props.match.player1Score,
            player2Score: props.match.player2Score,
            alreadyScored: props.match.alreadyScored
        }
        this.matchId = props.match.matchId;
        this.database = firebase.database();
        this.handlePlayer1ScoreChange = this.handlePlayer1ScoreChange.bind(this);
        this.handlePlayer2ScoreChange = this.handlePlayer2ScoreChange.bind(this);
        this.submitScore = this.submitScore.bind(this);


        // console.log("props here ", props)

    }

    componentDidMount(){
        const player1Promise = this.database.ref('users/' + this.state.player1).once('value');
        const player2Promise = this.database.ref('users/' + this.state.player2).once('value');
        Promise.all([player1Promise, player2Promise]).then(snapshots => {
            console.log(snapshots[0].val())
            const player1 = snapshots[0].val();
            const player2 = snapshots[1].val();
            console.log("player1 ", player1)
            console.log("player2", player2)
            this.setState({player1: player1, player2: player2})
        })

 
    }

    submitScore(event) {
        event.preventDefault();
        const matchRef = this.database.ref('matches/' + this.matchId);
        // const winner = this.state.player1Score > this.state.player2Score ? this.state.player1 : this.state.player2;
        // const loser = this.state.player1Score < this.state.player2Score ? this.state.player1 : this.state.player2;
        // const outcome = {winner: winner, loser: loser}
        // const groupsRef = this.database.ref('groups/').push();
        // groupsRef.set(
        //     {
        //         player: player1,
        //         group:
        //     }
        // )

        matchRef.set({
            player1: this.state.player1,
            player2: this.state.player2,
            player1Score: this.state.player1Score,
            player2Score: this.state.player2Score,
            alreadyScored: true,
            week: 1
        }).then(() => {
            this.setState({ alreadyScored: true });

            // debugger;
        })
    }

    handlePlayer1ScoreChange(event) {
        this.setState({player1Score: event.target.value})
    }

    handlePlayer2ScoreChange(event) {
        this.setState({player2Score: event.target.value})

    }


    render(props) {
        // console.log('props ', props)
        // console.log('this.props ', this.props)
        return (
            <div>
                <form>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Score</td>
                            </tr> 
                        </thead>
                        <tbody>
                            <tr>
                                <td>Player 1</td>
                                <td>{this.state.player1.firstName}</td>
                                { this.state.alreadyScored ? <td><input type="text" value={this.state.player1Score} onChange={this.handlePlayer1ScoreChange} disabled ></input></td> :
                                <td><input type="text" value={this.state.player1Score} onChange={this.handlePlayer1ScoreChange}></input></td>}
                            </tr>
                            <tr>
                                <td>Player 2</td>
                                <td>{this.state.player2.firstName}</td>
                                { this.state.alreadyScored ? <td><input type="text" value={this.state.player2Score} onChange={this.handlePlayer2ScoreChange} disabled></input></td> :
                                <td><input type="text" value={this.state.player2Score} onChange={this.handlePlayer2ScoreChange}></input></td>}
                            </tr>
                        </tbody>
                        
                    </table>
                    <button type="submit" onClick={this.submitScore}>Submit score</button>
                </form>
                
            </div>
        );
    }
}
export default DisplayMatch;