import React from 'react';

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.data.question,
            images: this.props.data.images,
            options: this.props.data.options,
            selected_option: null,
            answer: this.props.data.answer,
            explanation: this.props.data.explanation,

            index: props.index,
            callback: props.callback,
            scrolled: false
        };
    }

    render = () => {
        return null
    }
   
    optionClicked = (value) => {
        if (this.state.answered) return;

        console.log(value);
        this.setState({
            selected_option: value,
            answered: true
        });

        // Misschien dit stukje logica ook bij de quiz doen, want dat past wel beter
        let index = "pagemap-" + this.state.index;


        if (this.props.type === "score") {
            this.state.callback(this.state.index, (value === this.state.answer) ? "right" : "wrong");

            if (value === this.state.answer) {
                document.getElementById(index).style.backgroundColor = "#76cc00";
            } else {
                document.getElementById(index).style.backgroundColor = "#e8332a";
            }
        } else if (this.props.type === "personality") {

            this.setState({
                answer: value
            });

            this.state.callback(this.state.index, value);

            document.getElementById(index).style.backgroundColor = "#3a2f98";
        }
        
    }
}

export default Question;