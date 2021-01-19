import React from 'react';

import MenuShareIcons from '../MenuShareIcons.js'

var images = require.context('../../assets', true);

class PersonalityResultContainer extends React.Component {

    render = () => {

        let restart = images("./icons8-restart-26.png").default;
        let img_src = images("./" + this.props.results[this.props.answer].image).default;
        let img_link = this.props.results[this.props.answer].imageSource;
        let img_artist = this.props.results[this.props.answer].imageArtist;
        let message = this.props.results[this.props.answer].message;

        return (
            <div id="result-container" className="textblock">
                <div className="row">
                    <div className="col-12">
                        <p style={{float: "right", cursor: "pointer"}} onClick={() => this.restart()}>
                            <img src={restart} alt="Restart"></img>  Play again
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div id="message-container" className="col-12 col-md-6">
                        <h1>{this.props.answer}</h1>
                        <p>{message}</p>
                        <MenuShareIcons shareMessage="Share this quiz"/>
                    </div>
                    <div className="col-12 col-md-6">
                        <div id="image-container" className="image-contained-background" style={{backgroundImage: "url(" + img_src + ")"}} />
                        <span className="credit"><a href={img_link}>image source</a> by {img_artist} </span>
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

export default PersonalityResultContainer;