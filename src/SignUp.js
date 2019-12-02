import React from 'react';
import * as firebase from 'firebase';
import Matches from './Matches'
import DisplayMatch from './DisplayMatch'

class SignUp extends React.Component {

    constructor() {
        super()
        this.state = {firstName: '', surname: ''};
        this.database = firebase.database();
        this.addUser = this.addUser.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);

    }

    addUser(event) {
        event.preventDefault();
        console.log('jenny')
        const newUserRef = this.database.ref('users/').push();
        newUserRef.set({
            firstName: this.state.firstName,
            surname: this.state.surname,
        }).then(()=> {
            Matches();
        });
    }
    
    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleSurnameChange(event) {
        this.setState({surname: event.target.value});
    }




    render() {
        return (
            <div>
                <form className="SignUp" onSubmit={this.addUser}>
                    <input type="text" placeholder="Firstname" value={this.state.firstName} onChange={this.handleFirstNameChange}></input>
                    <input type="text" placeholder="Lastname" value={this.state.surname} onChange={this.handleSurnameChange}></input>
                    <button type="submit">Sign Up</button>
                </form>
                <DisplayMatch></DisplayMatch>
            </div>
        );
    }
  }

  
export default SignUp;
  