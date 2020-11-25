import React from 'react';
import ReactGA from 'react-ga';

//import ReactDOM from 'react-dom';

import ImageQuestion from './ImageQuestion.js';
import ListQuestion from './ListQuestion.js';
import PageMap from '../PageMap.js';
import ScoreResultContainer from './ScoreResultContainer.js';
import MainMenu from '../MainMenu.js';

import Quiz from './Quiz.js';

var images = require.context('../../assets', true);

class ScoreQuiz extends Quiz {

    componentDidMount = () => {
        window.scrollTo({
            top: 0    
        })

        this.setState({
            score: 0
        });
    }

    render = () => {

        let img_src = images("./" + this.state.titleImageSource).default;
        
        let callback = this.handleQuestionAnswered;

        let question_components = this.state.questions.map(
            function(question, index) {

                if (question.images) {
                    return <div key={index} id={"question-" + index}><ImageQuestion type="score" data={question} index={index} callback={callback}/></div>;
                } else {
                    return <div key={index} id={"question-" + index}><ListQuestion type="score" data={question} index={index} callback={callback}/></div>;
                }
            }
        )

        return (
            <div>
                <MainMenu />
                <PageMap itemType="question" items={this.state.questions.map(function(question) {return question.question})}/>
                <div className="row">
                    <div className="col-xs-0 col-sm-2 side"></div>
                    <div className="col-xs-12 col-sm-8 content">
                    
                        <div id="title-container">
                            <img src={images('./banner-quizzes.png').default} alt="Wheel of Timelines banner" />
                        </div>

                        <div className="inner-content">
                            <div className="unselectable quiz">
                                <div className="title white-text" style={{backgroundImage: "url(" + img_src + ")"}}>
                                    <h1>{this.state.title}</h1>
                                </div>
                                <span className="credit"><a href={this.state.titleImageCredit}>image source</a> by {this.state.titleImageArtist} </span>
                                { question_components}
                                {this.state.done ? <ScoreResultContainer score={this.state.score} total={this.state.questions.length} messages={{"bad": this.state.endMessageBad, "good": this.state.endMessageGood, "perfect":this.state.endMessagePerfect}} image={this.state.titleImageSource}/> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-0 col-sm-2 side"></div>
                </div>
            </div>
        )
    }

    handleQuestionAnswered = (index, value) => {
        console.log("question " + index + " answered.");

        let answered_new = this.state.answered;
        answered_new[index] = value;

        this.setState({
            answered: answered_new,
            last_answered: index
        })

        console.log(this.state.answered);

        let done = true;
        for (let i = 0; i < this.state.answered.length; i++) {
            if (this.state.answered[i] === "unanswered") done = false;
        }

        if (done){
            console.log("DONE!");

            let score = 0;

            for (let i = 0; i < this.state.answered.length; i++) {
                if (this.state.answered[i] === "right") score++;
            }

            this.setState({
                done: true,
                score: score
            })

            ReactGA.event({
                category: 'Quiz',
                action: 'Completed ' + this.state.title +  ' Quiz',
                label: score.toString(),
                value: score
            });
        }
    }
}

export default ScoreQuiz;