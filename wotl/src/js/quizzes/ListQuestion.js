import React from 'react';
//import ReactDOM from 'react-dom';

import Question from './Question.js';
import Explanation from './Explanation.js'

var images = require.context('../../assets', true);

class ListQuestion extends Question {

    constructor(props) {
        super(props);
        this.state.titleImage = props.data.titleImage;
        if (props.data.titleImage) {
            this.state.titleImageSource = props.data.titleImageSource;
            this.state.titleImageCredit = props.data.titleImageCredit;
            this.state.titleImageArtist = props.data.titleImageArtist;
        }
    }

    render = () => {

        let empty = images("./unanswered-box.png").default;
        let wrong = images("./wrong.png").default;
        let right = images("./right.png").default;
        let answered_image = images("./answered.png").default;
        let img_src = null;

        if (this.state.titleImage) img_src = images("./" + this.state.titleImageSource).default;

        return (
            <div className = "question list-question">
                <div className="textblock">
                    <h2>{this.state.title}</h2>
                </div>
                {
                    this.state.titleImage ? 
                    <div>
                        <div className="row list-image" style={{backgroundImage: "url(" + img_src + ")"}}></div>
                        <span className="credit"><a href={this.state.titleImageCredit}>image source</a> by {this.state.titleImageArtist} </span>
                    </div> : null
                }
                

                <div className="row">
                    <ul className="option-list">
                        { this.state.options.map(
                            (option, index) => {

                                

                                let img = 0;
                                
                                if (this.props.type === "score") {
                                    if (!this.state.answered) img = empty;
                                    else {
                                        if (option === this.state.answer) img = right;
                                        else if (option === this.state.selected_option) img = wrong;
                                        else { img = empty}
                                    }
                                } else if (this.props.type === "personality") {
                                    if (!this.state.answered) img = empty;
                                    else {
                                        if (option === this.state.answer) img = answered_image;
                                        else { img = empty}
                                    }
                                }

                                return (
                                <li key={index} 
                                    className="list-option" 
                                    style={{opacity: ((this.state.answered && (option !== this.state.answer && option !== this.state.selected_option)) ? 0.5 : 1)}}
                                    onClick={() => this.optionClicked(option)}>
                                    <img src={img} alt={"Option " + option}></img> {option}
                                </li>
                                );
                            }
                        )}
                    </ul>
                </div>
                <div>
                    {(this.state.answered && this.props.type === "score") ? <Explanation index={this.state.index} answer={this.state.answer} explanation={this.state.explanation}/> : null}
                </div>
            </div>
        )
    }
}

export default ListQuestion;