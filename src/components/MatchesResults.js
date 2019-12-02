import React from 'react';
import * as firebase from 'firebase';
import DisplayMatches from './DisplayMatches';

class MatchesResults extends React.Component {

    constructor() {
        super();
        this.state = { matches: [] }
    }

    componentDidMount() {
        // var usersRef = firebase.database().ref('users/');
        // usersRef.once('value')
        //     .then(snapshot => this.getMatches(snapshot))
        //     .then(pairs => {
        //         this.setState({ pairs: pairs })
        //     });

        var matchesRef = firebase.database().ref('matches/');
        matchesRef.once('value')
            .then(snapshot=> {
                this.setState({matches : snapshot.val()})
    });

    }

    // getMatches(snapshot) {
    //     const users = snapshot.val();
    //     const names = Object.values(users).map(user => user.firstName).filter(name => !!name)
    //     // console.log('names', names)
    //     // console.log('no of name', names.length)

    //     if (names.length % 2 !== 0) {
    //         // alert("You must have an even number of names. You currently have " + names.length + " names.");
    //     } else {

    //         names.sort(function () { return 0.5 - Math.random(); }); // shuffle array

    //         var pairs = []
    //         while (names.length) {
    //             var name1 = names.pop(), // get the last value of names
    //                 name2 = names.shift(); // get the first value of names
    //             pairs.push(
    //                 {
    //                     player1: name1,
    //                     player2: name2
    //                 }
    //             )
    //         }
    //         // console.log(pairs);
    //         return pairs;
    //     }
    // }

    render() {
        // console.log("pairs ", this.state.pairs)
        return (
            <div>
                <h1>All Matches and Results</h1>
                <DisplayMatches matches={this.state.matches} />
            </div>

        );
    }
}

export default MatchesResults;