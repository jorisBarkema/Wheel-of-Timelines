import React from 'react';
import { navigate } from "hookrouter";

var images = require.context('../../assets', true);

class QuizPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.data.title,
            image: props.data.titleImageSource,
            credit: props.data.titleImageCredit,
            artist: props.data.titleImageArtist,
            link: props.data.link
        };
    }

    render = () => {

        let img_src = images('./' + this.state.image).default;
        return (
            <div className="col-12 col-md-6">
                <div className="white-text quiz-preview shadowed" style={{backgroundImage: "url(" + img_src + ")"}}
                     onClick={() => navigate(this.state.link)}>
                    <h1>{this.state.title}</h1>
                </div>
                <span className="credit"><a href={this.state.credit}>image source</a> by {this.state.artist}</span>
            </div>
        )
    }
}

export default QuizPreview;