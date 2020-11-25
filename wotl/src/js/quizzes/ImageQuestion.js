import React from 'react';
//import ReactDOM from 'react-dom';

import Question from './Question.js';
import Explanation from './Explanation.js'

var images = require.context('../../assets', true);

class ImageQuestion extends Question {

    render = () => {
        return (
            <div className = "question image-question">
                <div className="textblock">
                    <h2>{this.state.title}</h2>
                </div>

                <div className="row">
                    { this.state.options.map(
                        (option, index) => {
                            
                            let img_src = images("./" + option.imageSource).default;
                            let right_source = images("./right.png").default;
                            let wrong_source = images("./wrong.png").default;

                            let column_count = (this.state.options.length % 3 === 0 && this.state.options.length % 2 !== 0) ? 4 : 6;

                            return (
                            <div key={index} className={"col-12 col-md-6 col-xl-" + column_count}>
                                <div className = "option white-text" style={{backgroundImage: "url(" + img_src + ")", opacity: ((this.state.answered && (option.value !== this.state.answer && option.value !== this.state.selected_option)) ? 0.5 : 1)}} onClick={() => this.optionClicked(option.value)}>
                                    {this.props.data.showValues ? <p>{option.value}</p> : null}
                                    {this.state.answered ? (
                                        <div className="answer-icon">
                                            {option.value === this.state.answer ? <img src={right_source} alt="Correct Answer"></img> : 
                                                option.value === this.state.selected_option ? <img src={wrong_source} alt="Wrong Answer"></img> : null}
                                        </div>) : null}
                                </div>
                                <span className="credit"><a href={option.imageCredit}>image source</a> by {option.imageArtist} </span>
                            </div>
                            );
                        }
                    )}
                </div>
                <div>
                    {this.state.answered ? <Explanation index={this.state.index} answer={this.state.answer} explanation={this.state.explanation}/> : null}
                </div>
            </div>
        )
    }
}

export default ImageQuestion;