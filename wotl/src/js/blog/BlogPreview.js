import React from 'react';
import { withRouter  } from 'react-router-dom';

import DateContainer from '../DateContainer.js'

var images = require.context('../../assets', true);

class BlogPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.data.title,
            link: props.data.link,
            titleImage: props.data.titleImage,
            date : props.data.date,
            previewText: props.data.previewText
        };
    }

    render = () => {

        let titleImgSrc = images('./' + this.state.titleImage).default;
        let className = this.props.last ? "blog-preview last" : "blog-preview";

        return (
            <div className={className} onClick={() => this.props.history.push(this.state.link)}>
                <div className="row">
                    <div className="col-12 col-md-4 preview-image" style={{backgroundImage: "url(" + titleImgSrc + ")"}}>
                    </div>
                    <div className="col-12 col-md-8 preview-text">
                        <h1>{this.state.title}</h1>
                        <p>{this.state.previewText} <span style={{color:"black"}}> Read More</span></p>
                        <DateContainer date={new Date(this.state.date)} className="preview-date" />
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(BlogPreview)