import React from 'react';

class Quiz extends React.Component {
    constructor(props) {

        console.log(props.data);

        super(props);
        this.state = {
            title: props.data.title,
            startMessage: props.data.hasOwnProperty('startMessage') ? props.data.startMessage : null, //this.props.event.hasOwnProperty("sponsor")
            questions: props.data.questions,
            titleImageSource: props.data.titleImageSource,
            titleImageCredit: props.data.titleImageCredit,
            titleImageArtist: props.data.titleImageArtist,
            endMessageBad: props.data.endMessageBad,
            endMessageGood: props.data.endMessageGood,
            endMessagePerfect: props.data.endMessagePerfect,
            answered: new Array(props.data.questions.length).fill("unanswered"),
            done: false
        };
    }

    render = () => {

        return <p>This should not be visible</p>;
    }

    componentDidMount = () => {
        window.scrollTo({
            top: 0    
        })
    }

    handleQuestionAnswered = (index, value) => {
        console.log("calling question answered of Quiz.js, should not happen.");
        return null
    }
}

export default Quiz;