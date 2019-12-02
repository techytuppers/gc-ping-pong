import React from 'react';
import DisplayMatch from './DisplayMatch'

class DisplayMatches extends React.Component {
    constructor(){
        super();
    }
    render() {
        console.log("this.props ", this.props)

        const pairComponents = this.props.pairs.map(pair => <DisplayMatch pair={pair}/>)
        return (
            <div>
                {pairComponents}
            </div>
        );
    }
}
export default DisplayMatches;