import React from 'react';

import QuizPreview from './QuizPreview.js'
import MainMenu from '../MainMenu.js'

var images = require.context('../../assets', true);

class QuizCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: props.quizzes
        };
    }

    render = () => {

        return (
            <div>
                <MainMenu />

                <div className="outer-container">

                    <div className="row">
                        <div className="col-xs-0 col-sm-2 side"></div>
                        <div className="col-xs-12 col-sm-8 content">

                            <div id="title-container">
                                <img src={images('./banner-quizzes.png')} alt="Wheel of Timelines banner" />
                            </div>

                            <div className="inner-content">
                                <div className="row unselectable">
                                    { 
                                        this.state.quizzes.map((quiz, index) => {
                                            return (
                                                <QuizPreview key={index} data={quiz}/>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-xs-0 col-sm-2 side"></div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        window.scrollTo({
            top: 0    
        })
    }
}

export default QuizCollection;