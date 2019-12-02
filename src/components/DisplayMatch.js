import React from 'react';

class DisplayMatch extends React.Component {
    constructor(props){
        super();
        console.log("props here ", props)

    }
    render(props) {
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
                            <td>Jen</td>
                            <td><input type="text"></input></td>
                        </tr>
                        <tr>
                            <td>Player 2</td>
                            <td>Jen</td>
                            <td><input type="text"></input></td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        );
    }
}
export default DisplayMatch;