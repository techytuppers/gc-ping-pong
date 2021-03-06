import React from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components';

const FormInput = styled.input`
    background-color: #fff;
    border: 1px solid;
    border-color: var(--color-primary);
    border-radius: 4px;
    color: #2c2d2f;
    display: block;
    margin-bottom: 18px;
    padding: 9px;
    transition: border-color .2s ease;
    font-size: 16px;
`;

class SignUp extends React.Component {

    constructor() {
        super()
        this.state = { firstName: '', surname: '', success: false, playerCount: 0 };
        this.database = firebase.database();
        this.addUser = this.addUser.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
    }

    componentDidMount() {
        var usersRef = firebase.database().ref('users/');
        usersRef.once('value')
            .then(snapshot=> Object.keys(snapshot.val()).length)
            .then(playerCount=> this.setState({playerCount: playerCount}))
    }

    addUser(event) {

        event.preventDefault();
        console.log('hi')
        const newUserRef = this.database.ref('users/').push();
        newUserRef.set({
            firstName: this.state.firstName,
            surname: this.state.surname,
        }).then(() => {
            this.setState({ success: true, playerCount: this.state.playerCount + 1 });

            // debugger;
        })
            .catch((error) => {
                this.setState({ success: false });

                // debugger;
            })
    }

    handleFirstNameChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleSurnameChange(event) {
        this.setState({ surname: event.target.value });
    }


    render() {
        const maxPlayers = 32;
        const playerCount = this.state.playerCount;
        const tournamentFull = this.state.playerCount >= maxPlayers;
        return (
            <div>
                <h1>Fill in your name to join the next Ping Pong Tournament!</h1>
                <div>Current no of Players: {playerCount}</div>
                {tournamentFull ? 
                    <div>Tournament FULL!</div>
                    : <div>Players Still Needed: {maxPlayers - playerCount}</div>}
                
                {this.state.success ? <div>You've signed up</div> :
                !tournamentFull &&
                <form className="form" onSubmit={this.addUser}>
                    <label for="firstName">First name</label>
                    <FormInput id="firstName" type="text" value={this.state.firstName} onChange={this.handleFirstNameChange}></FormInput>
                    <label for="lastName">Last name</label>
                    <FormInput id="lastName" type="text" value={this.state.surname} onChange={this.handleSurnameChange}></FormInput>
                    <button className="button button--primary" type="submit">Join the Tournament</button>
                </form>}
            </div>

        );
    }
}


export default SignUp;
