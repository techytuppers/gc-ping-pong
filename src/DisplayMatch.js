import React from 'react';

class DisplayMatch extends React.Component {
    constructor(){
        super();
    }
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Score</td>
                    </tr>
                    <tr>
                        <td>Player 1</td>
                        <td>Jen</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Player 2</td>
                        <td>Jen</td>
                        <td><input type="text"></input></td>
                    </tr>
                </table>
            </div>
        );
    }
}
export default DisplayMatch;
