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
        var usersRef = firebase.database().ref();
        usersRef.once('value')
            .then(snapshot=> {
                return Object.keys(snapshot.val().users).length
            })
            .then(playerCount=> {
                console.log('set state ', playerCount)
                return this.setState({playerCount: playerCount})
            })
            .catch(err=> console.log(err))
        
    }

    addUser(event) {

        event.preventDefault();
        console.log('hi')
        const newUserRef = this.database.ref('users/').push();
        newUserRef.set({
            firstName: this.state.firstName,
            surname: this.state.surname,
            group: "A"
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

    create8Users() {
        const users = ["test1", "test2", "test3", "test4", "alice", "bob", "claire", "dan"]
        users.forEach(user => {
            const newUserRef = firebase.database().ref('users/').push();
            newUserRef.set({
                firstName: user,
                surname: user,
                group: "A"
            })
        })
        
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
                    <button onClick={this.create8Users}>Create 8 Random Users</button>
                </form>}
            </div>

        );
    }
}


export default SignUp;
