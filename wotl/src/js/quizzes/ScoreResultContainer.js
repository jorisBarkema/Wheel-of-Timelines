import React from 'react';

import MenuShareIcons from '../MenuShareIcons.js'

var images = require.context('../../assets', true);

class ScoreResultContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: props.score,
            total: props.total,
            messages: props.messages,
            image: props.image
        }
    }

    render = () => {

        let restart = images("./icons8-restart-26.png").default;
        let back = images("./icons8-back-24.png").default;
        let img_src = images("./" + this.state.image).default;
        let message = "Well done!";

        let percentage = this.state.score / this.state.total;

        if (this.state.messages["good"] !== undefined) {
            message = this.state.messages["good"];
        // niet percentage gebruiken hier door afrondfouten
        }

        if (percentage < 0.34 && this.state.messages["bad"] !== undefined) {
            message = this.state.messages["bad"];
        }
        
        if (this.state.score === this.state.total && this.state.messages["perfect"] !== undefined) {
            message = this.state.messages["perfect"];
        }


        return (
            <div id="result-container" className="textblock">
                <div className="row">
                    <div className="col-12">
                        <p style={{float: "left"}}>
                            You got {this.state.score} / {this.state.total} right
                        </p>
                        <p style={{float: "right", cursor: "pointer"}} onClick={() => this.restart()}>
                            <img src={restart} alt="Restart"></img>  Play again
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div id="message-container" className="col-12 col-md-6">
                        <h1>{message}</h1>
                        <p className="credit"><a href="/quizzes"><img src={back} alt="Back to quizzes"/> Back to the quizzes</a></p>
                        <MenuShareIcons shareMessage="Share this quiz"/>
                    </div>
                    <div className="col-12 col-md-6 image-full-background" style={{backgroundImage: "url(" + img_src + ")"}}>
                    
                    </div>
                </div>
            </div>
        )
    }

    restart = () => {
        window.scrollTo({
            top: 0  
        })

        // Dit kan ook veel beter, met een callback vd quiz om alles te legen.
        // dan moet wel ook de pagemap gevuld worde ndoor de quiz ipv de questions zelf
        window.location.reload(false);
    }
}

export default ScoreResultContainer;