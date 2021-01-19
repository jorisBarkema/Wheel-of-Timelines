import React from 'react';
import ReactGA from 'react-ga';
//import ReactDOM from 'react-dom';

import ImageQuestion from './ImageQuestion.js';
import ListQuestion from './ListQuestion.js';
import PageMap from '../PageMap.js';
import PersonalityResultContainer from './PersonalityResultContainer.js';
import MainMenu from '../MainMenu.js';

import Quiz from './Quiz.js';

var images = require.context('../../assets', true);

class PersonalityQuiz extends Quiz {

    componentDidMount = () => {
        window.scrollTo({
            top: 0    
        })

        this.setState({
            points: this.props.data.points,
            results: this.props.data.results
        });
    }

    render = () => {

        let img_src = images("./" + this.state.titleImageSource).default;
        
        let callback = this.handleQuestionAnswered;

        let question_components = this.state.questions.map(
            function(question, index) {

                if (question.images) {
                    return <div key={index} id={"question-" + index}><ImageQuestion type="personality" data={question} index={index} callback={callback}/></div>;
                } else {
                    return <div key={index} id={"question-" + index}><ListQuestion type="personality" data={question} index={index} callback={callback}/></div>;
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

                                {
                                    (this.state.startMessage != null) ?
                                    (<div className="textblock">
                                        <p>{this.state.startMessage}</p>
                                    </div>) : null
                                }

                                { question_components}
                                {this.state.done ? <PersonalityResultContainer answer={this.state.answer} points={this.state.points} results={this.state.results} messages={{"bad": this.state.endMessageBad, "good": this.state.endMessageGood, "perfect":this.state.endMessagePerfect}} image={this.state.titleImageSource}/> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-0 col-sm-2 side"></div>
                </div>
            </div>
        )
    }

    handleQuestionAnswered = (index, answer) => {
        console.log("question " + index + " answered.");

        let answered_new = this.state.answered;
        answered_new[index] = answer;

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

            let possibilities = Object.keys(this.state.results);

            let score = {};
            for (let i = 0; i < possibilities.length; i++) {
                score[possibilities[i]] = 0;
            }

            for (let i = 0; i < this.state.answered.length; i++) {
                
                let a = this.state.answered[i];
                let p = this.props.data.points[i];
                
                console.log("question " + i);
                for (const [ option, results ] of Object.entries(p)) {

                    if (option === a)
                        for (const [ name, v ] of Object.entries(results)) {
                            console.log("Adding " + v + " points to " + name);
                            score[name] += v;
                        }
                }
                
            }

            console.log(score);

            
            let a = this.getWinner(score);
            console.log("Winner: " + a);
            this.setState({
                done: true,
                score: 0,
                answer: a
            })

            
            ReactGA.event({
                category: 'Quiz',
                action: 'Completed ' + this.state.title +  ' Quiz',
                label: a
            });
        }
    }

    getWinner = (dict) => {
        let best = "None";
        let most = 0;

        for (const [ key, value ] of Object.entries(dict)) {
            if (value > most) {
                most = value;
                best = key;
            }
        }

        return best;
    }
}

export default PersonalityQuiz;