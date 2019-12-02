import React from 'react';

class DisplayMatch extends React.Component {
    constructor(props){
        super();
        // console.log("props here ", props)

    }
    render(props) {
        console.log('displaymatch pair ', this.props.pair)
        return (
            <div>
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
                            <td><input type="text"></input></td>
                        </tr>
                        <tr>
                            <td>Player 2</td>
                            <td>{this.props.pair.player2}</td>
                            <td><input type="text"></input></td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        );
    }
}
export default DisplayMatch;