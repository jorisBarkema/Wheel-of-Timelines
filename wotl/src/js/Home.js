import React from 'react';
import Button from '@material-ui/core/Button';
import { navigate } from "hookrouter";

import MainMenu from './MainMenu.js';
import QuizPreview from './quizzes/QuizPreview.js';
import BlogPreview from './blog/BlogPreview.js';
import Announcement from './Announcement.js';

import dropFlags from '../quizzes/drop-nations.json';
import whichforsaken from '../quizzes/which-forsaken-are-you.json';

//import posts from './assets/blogposts.json';

import eotwBlog from '../blogs/why-eotw-works.jsx';

let latestPost = {
    title: "Why The Eye of the World Works",
    titleImage: "blog_assets/green-mans-garden.jpg",
    titleImageCredit: "https://i.imgur.com/tpEMJ57.jpg",
    titleImageArtist: "Lightwaved",
    date: "5/22/2020",
    previewText: "If you are reading this, then it is fair to assume that you have read The Eye of the World, and ... ",
    post: eotwBlog
}

latestPost.link = '/blog/' + latestPost.title.replace(/ /g, "_");

var images = require.context('../assets', true);

class Home extends React.Component {

    render = () => {

        return (
            <div>
                <MainMenu />

                <div className="outer-container">
                
                    <div className="row">
                        <div className="col-xs-0 col-sm-2 side"></div>
                        <div className="col-xs-12 col-sm-8 content">
                        
                            <div id="title-container">
                                <img src={images('./banner.png').default} alt="Wheel of Timelines banner" />
                            </div>

                            <div className="inner-content">
                            
                                <div className="home-item">
                                    <Announcement />
                                </div>    

                                <div className="home-item">
                                
                                    <div className="image shadowed" style={{backgroundImage: "url(" + images('./Map-screenshot.png').default + ")", cursor: "pointer"}} onClick={() => navigate('/map')}></div>
                                    <span className="credit"> </span>
                                    <h2>
                                        <Button
                                            onClick={() => navigate('/map')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={images('./icons8-email-send-32.png').default} alt="Go to map"/> Visit the Map
                                        </Button>
                                    </h2>
                                </div>

                                <div className="home-item">
                                    <div className="row">
                                        <QuizPreview data={dropFlags}/>
                                        <QuizPreview data={whichforsaken}/>
                                    </div>
                                    <h2>
                                        <Button
                                            onClick={() => navigate('/quizzes')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={images('./icons8-email-send-32.png').default} alt="Go to quizzes" /> Try the Quizzes
                                        </Button>
                                    </h2>
                                </div>

                                <div className="home-item">
                                
                                    <div className="image shadowed" style={{backgroundImage: "url(" + images('./timeline-preview.png').default + ")", cursor: "pointer"}} onClick={() => navigate('/timeline')}></div>
                                    <span className="credit"> </span>
                                    <h2>
                                        <Button
                                            onClick={() => navigate('/timeline')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={images('./icons8-email-send-32.png').default} alt="View the timeline"/> View the timeline
                                        </Button>
                                    </h2>
                                </div>

                                <div className="home-item last">
                                    
                                    <div className="row">
                                        <BlogPreview data={latestPost} last/>
                                    </div>
                                    <h2>
                                        <Button
                                            onClick={() => navigate('/blog')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={images('./icons8-email-send-32.png').default} alt="Go to blog" /> Read the Blog
                                        </Button>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-0 col-sm-2 side"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home