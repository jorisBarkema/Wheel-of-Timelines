import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

import MainMenu from './MainMenu.js';
import QuizPreview from './quizzes/QuizPreview.js';
import BlogPreview from './blog/BlogPreview.js';
import Announcement from './Announcement.js';

//import whichTaveren from '../quizzes/which-taveren-are-you.json';
import whichforsaken from '../quizzes/which-forsaken-are-you.json';
import whichTalent from '../quizzes/which-talent.json';

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
                                <img src={require('../assets/banner.png')} alt="Wheel of Timelines banner" />
                            </div>

                            <div className="inner-content">
                            
                                <div className="home-item">
                                    <Announcement />
                                </div>    

                                <div className="home-item">
                                    <div className="image shadowed" style={{backgroundImage: "url(images/Map-screenshot.png)", cursor: "pointer"}} onClick={() => this.props.history.push('/map')}></div>
                                    <span className="credit"> </span>
                                    <h2>
                                        <Button
                                            onClick={() => this.props.history.push('/map')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={require('../assets/icons8-email-send-32.png')} alt="Go to map"/> Visit the Map
                                        </Button>
                                    </h2>
                                </div>

                                <div className="home-item">
                                    <div className="row">
                                        <QuizPreview data={whichTalent}/>
                                        <QuizPreview data={whichforsaken}/>
                                    </div>
                                    <h2>
                                        <Button
                                            onClick={() => this.props.history.push('/quizzes')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={require('../assets/icons8-email-send-32.png')} alt="Go to quizzes" /> Try the Quizzes
                                        </Button>
                                    </h2>
                                </div>

                                <div className="home-item">
                                
                                    <div className="image shadowed" style={{backgroundImage: "url(images/timeline-preview.png)", cursor: "pointer"}} onClick={() => this.props.history.push('/timeline')}></div>
                                    <span className="credit"> </span>
                                    <h2>
                                        <Button
                                            onClick={() => this.props.history.push('/timeline')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={require('../assets/icons8-email-send-32.png')} alt="View the timeline"/> View the timeline
                                        </Button>
                                    </h2>
                                </div>

                                <div className="home-item last">
                                    
                                    <div className="row">
                                        <BlogPreview data={latestPost} last/>
                                    </div>
                                    <h2>
                                        <Button
                                            onClick={() => this.props.history.push('/blog')}
                                            variant="contained"
                                            color="primary"
                                            className={'button'}
                                            size="large">
                                            <img src={require('../assets/icons8-email-send-32.png')} alt="Go to blog" /> Read the Blog
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

export default withRouter(Home)