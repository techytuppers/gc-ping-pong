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
        this.resetMatches()
    }

    resetMatches() {
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
                console.log('XXX setting state matches', matches)
                this.setState({
                    matches : matches,
                    week : week
                })
        }).catch(err => console.log(err));
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
        var matchesRef = firebase.database().ref('matches/');
        matchesRef.once('value')
        .then(snapshot=> {
            const week = this.calculateWeek(snapshot.val());
            const groups = this.generateGroups(week, snapshot)
            return groups
        }).then(groups => {
            console.log("GROUPS ", groups)
            // For each group generate pairs
            var pairs;
            Object.values(groups).forEach(users => {
                // console.log('groups ', groups)
                console.log('users ',users)
                pairs = this.getMatches(users)
                // For each pair generate a new match
                pairs.map(pair => this.createNewMatch(pair));
                Promise.all(pairs).then(() => this.resetMatches())
            })
            
            
        
        })
    }

    createNewMatch(pair){
        const newMatchRef = firebase.database().ref('matches/').push();
                console.log("pair.player1 ", pair.player1)
                
                return newMatchRef.set({
                    player1: pair.player1,
                    player2: pair.player2,
                    week: this.state.week + 1
                });
    }

       
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



    // copied from generatetournament
    getMatches(users) {
        console.log("users ", users)
        if (users.length % 2 !== 0) {
          alert("You must have an even number of names. You currently have " + users.length + " names.");
        } else {
    
          users.sort(function () { return 0.5 - Math.random(); }); // shuffle array
    
          var pairs = []
          while (users.length) {
            var user1 = users.pop(); // get the last value of names
            var user2 = users.pop(); // get the first value of names
            pairs.push(
              {
                player1: user1,
                player2: user2
              }
            )
          }
          console.log(pairs);
          return pairs;
        }
      }

    async generateGroups(week, snapshot) {
        // console.log("week ", week)
        // console.log("snapshot ", snapshot.val())
        var usersRef = firebase.database().ref('users/');
        return usersRef.once('value')
        .then(snapshot => {
            const groups = {}
            const users = Object.entries(snapshot.val());
            // console.log("users ", users)
            users.forEach(user=> {
                console.log("user[1].group", user[1].group)
                const existingUsers = groups[user[1].group] || []
                existingUsers.push(user)
                // console.log("existingUsers", existingUsers)
                groups[user[1].group] = existingUsers      
            })
            return groups
        })
        
    }

    render() {
        console.log("XXX this.state.matches", this.state.matches)
        console.log("this.state.week", this.state.week)
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