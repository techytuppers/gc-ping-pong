import React from 'react';
import * as firebase from 'firebase';

// Week -> group last week -> outcome -> group next week -> position
const groupsMap = {
    1 : {
        win: "A",
        lose: "B"
    },
    2 : {
        A: {
            win: "A",
            lose: "B"
        },
        B : {
            win: "C",
            lose: "D"
        }
    },
    3 : {
        A: {
            win: "A",
            lose: "B"
        },
        B: {
            win: "C",
            lose: "D"
        },
        C: {
            win: "E",
            lose: "F"
        },
        D: {
            win: "G",
            lose: "H"
        }
    },
    4: {
        A: {
            win: 1,
            lose: 2
        },
        B: {
            win: 3,
            lose: 4
        },
        C: {
            win: 5,
            lose: 6
        },
        D: {
            win: 7,
            lose: 8
        },
        E: {
            win: 9,
            lose: 10
        },
        F: {
            win: 11,
            lose: 12
        },
        G: {
            win: 13,
            lose: 14
        },
        H: {
            win: 15,
            lose: 16
        }
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
            alreadyScored: props.match.alreadyScored,
            week: props.week
        }
        this.matchId = props.match.matchId;
        this.database = firebase.database();
        this.handlePlayer1ScoreChange = this.handlePlayer1ScoreChange.bind(this);
        this.handlePlayer2ScoreChange = this.handlePlayer2ScoreChange.bind(this);
        this.submitScore = this.submitScore.bind(this);


        console.log("this.state.player1 ", this.state.player1)

    }

    componentDidMount(){
        // const player1Promise = this.database.ref('users/' + this.state.player1).once('value');
        // const player2Promise = this.database.ref('users/' + this.state.player2).once('value');
        // Promise.all([player1Promise, player2Promise]).then(snapshots => {
        //     console.log(snapshots[0].key)
        //     const player1 = snapshots[0];
        //     const player2 = snapshots[1];
        //     console.log("player1 ", player1)
        //     console.log("player2", player2)
        //     this.setState({player1Name: player1, player2Name: player2})
        // })

 
    }

    submitScore(event) {
        event.preventDefault();
        console.log( this.state.player1)
        const matchRef = this.database.ref('matches/' + this.matchId);
        const player1Ref = this.database.ref('users/' + this.state.player1[0]);
        const player2Ref = this.database.ref('users/' + this.state.player2[0]);
        const winGroup = groupsMap[String(this.state.week)].win
        const loseGroup = groupsMap[String(this.state.week)].lose

        player1Ref.update({
            group : this.state.player1Score > this.state.player2Score ? winGroup : loseGroup
        })
        player2Ref.update({
            group : this.state.player1Score < this.state.player2Score ? winGroup : loseGroup
        })

        // const outcome = {winner: winner, loser: loser}
        // const groupsRef = this.database.ref('groups/').push();
        // groupsRef.set(
        //     {
        //         player: player1,
        //         group:
        //     }
        // )

        matchRef.update({
            player1Score: this.state.player1Score,
            player2Score: this.state.player2Score,
            alreadyScored: true,
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
                                <td>{this.state.player1[1].firstName}</td>
                                { this.state.alreadyScored ? <td><input type="text" value={this.state.player1Score} onChange={this.handlePlayer1ScoreChange} disabled ></input></td> :
                                <td><input type="text" value={this.state.player1Score} onChange={this.handlePlayer1ScoreChange}></input></td>}
                            </tr>
                            <tr>
                                <td>Player 2</td>
                                <td>{this.state.player2[1].firstName}</td>
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