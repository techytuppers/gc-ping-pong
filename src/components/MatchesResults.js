import React from 'react';
import * as firebase from 'firebase';
import DisplayMatches from './DisplayMatches';

class MatchesResults extends React.Component {

    constructor() {
        super();
        this.state = { 
            matches: [],
            week: 1
        }
        this.generateNextWeek = this.generateNextWeek.bind(this);
    }

    componentDidMount() {
        var matchesRef = firebase.database().ref('matches/');
        matchesRef.once('value')
            .then(snapshot=> {
                const week = this.calculateWeek(snapshot.val());
                const matches = Object.entries(snapshot.val())
                .filter((key, value) => {
                    return key[1].week === week
                })
                .map((key, value) => {
                    const match = {
                        matchId : key[0],
                        player1 : key[1].player1,
                        player2 : key[1].player2,
                        player1Score : key[1].player1Score,
                        player2Score : key[1].player2Score,
                        alreadyScored : key[1].player1Score && key[1].player1Score
                    }
                    return match
                });
                console.log('setting state week', week)
                console.log('setting state matches', matches)
                this.setState({
                    matches : matches,
                    week : week
                })
        });
}

    calculateWeek(matches) {
        if (!matches) {
            return 1;
        }
        if (Object.entries(matches).length === 0) {
            return 1;
        }
        const weeks = Object.entries(matches).map((key, value) => key[1].week)
        return Math.max(...weeks)
    }

    weekNav() {
        return (
            <div>
                {this.weekButton(1)}
                {this.weekButton(2)}
                {this.weekButton(3)}
                {this.weekButton(4)}
                {this.weekButton(5)}
            </div>
        );
    }

    weekButton(week) {
        return (
            <button 
                className={week <= this.state.week  ? "button--primary": ""}
                // onClick={this.setState({week: week})}
            >
                Week{week}
            </button>
        )

    }

    generateNextWeek() {  
        // var matchesRef = firebase.database().ref('matches/');
        // matchesRef.once('value')
        // .then(snapshot=> {
        //     const week = this.calculateWeek(snapshot.val());
        //     const groups = this.generateGroups(week, snapshot)

        //     week += 1
        //     // For each group generate pairs
        //     // For each pair generate a new match
        //     // matchesRef.set({
        //     //     player1:
        //     //     player2:
        //     //     week: week
        //     // })
        //     const newMatches = Object.entries(snapshot.val())
        //     .filter((key, value) => key[1].week === week)
        //     .map((key, value) => {
        //         const match = {
        //             matchId : key[0],
        //             player1 : key[1].player1,
        //             player2 : key[1].player2,
        //             player1Score : key[1].player1Score,
        //             player2Score : key[1].player2Score,
        //             alreadyScored : key[1].player1Score && key[1].player1Score
        //         }
        //         return match
        //     })
        //     this.setState({
        //         matches : newMatches,
        //         week : week
        //     })
        // });
    }

    generateGroups(week, snapshot) {
        // const matches = Object.entries(snapshot.val())
        // const groups = {}
        // for (i = 1; i < week; i++) {

        // }
        // matches.forEach((key, value) => {
        //     if (key.week < week){
        //         if (key.week === 0) {
        //             groups["1"] = key.winner
        //             groups["2"] = key.loser
        //         } else {

        //         }
        //         console.log('matches ', key, value)
        //     }
        // });
        // return groups
    }

    render() {
        // console.log("pairs ", this.state.pairs)
        return (
            <div>
                <h1>All Matches and Results</h1>
                
                {this.weekNav()}
                
                <DisplayMatches matches={this.state.matches} week={this.state.week} />
                <br></br>
                <button onClick={this.generateNextWeek}>All matches played!</button>
            </div>

        );
    }
}

export default MatchesResults;