import React from 'react';
import * as firebase from 'firebase';

class DisplayMatch extends React.Component {
    constructor(props){
        super();
        this.state = {
            player1Score:0,
            player2Score:0,
        }
        this.database = firebase.database();
        this.handlePlayer1ScoreChange = this.handlePlayer1ScoreChange.bind(this);
        this.handlePlayer2ScoreChange = this.handlePlayer2ScoreChange.bind(this);
        this.submitScore = this.submitScore.bind(this);


        // console.log("props here ", props)

    }

    submitScore(event) {
        event.preventDefault();
        console.log('hello')
        const newMatchRef = this.database.ref('matches/').push();
        newMatchRef.set({
            player1: this.props.pair.player1,
            player1Score: this.state.player1Score,
            player2: this.props.pair.player2,
            player2Score: this.state.player2Score,
            week: 1
        }).then(() => {
            this.setState({ success: true });

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
        // console.log('displaymatch pair ', this.props.pair)
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
                                <td>{this.props.pair.player1}</td>
                                <td><input type="text" value={this.state.player1Score} onChange={this.handlePlayer1ScoreChange}></input></td>
                            </tr>
                            <tr>
                                <td>Player 2</td>
                                <td>{this.props.pair.player2}</td>
                                <td><input type="text" value={this.state.player2Score} onChange={this.handlePlayer2ScoreChange}></input></td>
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