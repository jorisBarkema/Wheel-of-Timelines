import React from 'react';
//import ReactDOM from 'react-dom';

//var images = require.context('./assets', true);

class Explanation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: props.answer,
            explanation: props.explanation,
            index: props.index
        }
    }

    render = () => {
        return (
            <div id={"explanation-" + this.state.index}>
                <p>
                    <b>{this.state.answer}</b><br></br>
                    {this.state.explanation}
                </p>
            </div>
        )
    }
}

export default Explanation;