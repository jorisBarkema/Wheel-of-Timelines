import React from 'react';

import BlogPreview from './BlogPreview.js';
import MainMenu from '../MainMenu.js'

var images = require.context('../../assets', true);

class Blog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts
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
                                <img src={images('./banner-blog.png').default} alt="Wheel of Timelines banner" />
                            </div>

                            <div className="inner-content">
                                <div className="row unselectable">
                                    { 
                                        this.state.posts.map((post, index) => {
                                            console.log(this.state.posts);
                                            return (
                                                <div key={index} className="col-12">
                                                    <BlogPreview data={post} last={index === this.state.posts.length - 1}/>
                                                </div>
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

export default Blog