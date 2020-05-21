import React from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';
import DisplayMatches from './DisplayMatches';

const Wrapper = styled.div`
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 20px;
`;

class GenerateTournament extends React.Component {
  constructor() {
    super();
    // this.state = { pairs: [] }
    this.database = firebase.database()
    this.generateTournament = this.generateTournament.bind(this)
  }

  generateTournament(event) {
    event.preventDefault();
    var usersRef = this.database.ref('users/');
    // var that = this;
    usersRef.once('value')
      .then(snapshot => this.getMatches(snapshot))
      .then(pairs => {
        this.database.ref('matches/').remove();
        pairs.forEach(pair => {
          const newTournamentRef = this.database.ref('matches/').push();
          newTournamentRef.set({
            player1: pair.player1,
            player2: pair.player2,
            week: 1
          });
        });
      });
    
  }

  purgeTournament() {
    
  }

  getMatches(snapshot) {
    const users = snapshot.val();
    const names = Object.values(users).map(user => user.firstName).filter(name => !!name)

    if (names.length % 2 !== 0) {
      alert("You must have an even number of names. You currently have " + names.length + " names.");
    } else {

      names.sort(function () { return 0.5 - Math.random(); }); // shuffle array

      var pairs = []
      while (names.length) {
        var name1 = names.pop(); // get the last value of names
        var name2 = names.pop(); // get the first value of names
        pairs.push(
          {
            player1: name1,
            player2: name2
          }
        )
      }
      console.log(pairs);
      return pairs;
    }
  }

  render() {
    return (
      <div>
        <h1>Admin area</h1>
        <Wrapper>
          <h2>Create opponent pairs for a new tournament</h2>
          <button onClick={this.generateTournament} className="button button--primary">Go!</button>
        </Wrapper>
        <Wrapper>
          <h2>Purge all users</h2>
          <button onClick={this.purgeTournament} className="button button--primary">Go!</button>
        </Wrapper>
      </div>

    );
  }
}

export default GenerateTournament;
