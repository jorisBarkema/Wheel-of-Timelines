import React from 'react';
//import AdSense from 'react-adsense';

import DateContainer from '../DateContainer.js';
import MainMenu from '../MainMenu.js';
import BlogFooter from './BlogFooter.js';

var images = require.context('../../assets', true);

class BlogPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.data.title,
            link: props.data.link,
            titleImage: props.data.titleImage,
            titleImageCredit: props.data.titleImageCredit,
            titleImageArtist: props.data.titleImageArtist,
            date : props.data.date,
            post: props.data.post
        };
    }

    render = () => {

        let titleImgSrc = images('./' + this.state.titleImage);

        return (

            
            <div>
                <MainMenu />
                
                <div className="outer-container">

                    <div className="row">
                        <div className="col-xs-0 col-sm-2 side"></div>
                        <div className="col-xs-12 col-sm-8 content">

                            <div id="title-container">
                                <img src={images('./banner-blog.png')} alt="Wheel of Timelines banner" />
                            </div>

                            <div className="inner-content">
                                <div className="title-container">
                                    <div className="title white-text" style={{backgroundImage: "url(" + titleImgSrc + ")"}}>
                                        <h1>{this.state.title}</h1>
                                    </div>
                                    <span className="credit"><a href={this.state.titleImageCredit}>image source</a> by {this.state.titleImageArtist} </span>
                                    <DateContainer date={new Date(this.state.date)} className="blogpost-date" />
                                </div>
                                
                                <div className="row" style={{width: '100%'}}>
                                    { 
                                        this.state.post()
                                    }
                                </div>

                                <div className="row" style={{width: '100%'}}>
                                    <BlogFooter />
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

export default BlogPost