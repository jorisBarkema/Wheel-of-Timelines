import React from 'react';

var images = require.context('../assets', true);

function Announcement() {
    return (
        <div id="announcement" className="row">
            <div className="col-12 col-lg-4">
                <h3>
                    <img src={images('./icons8-map-marker-52.png').default} alt="Map" />
                    Latest Map Update
                </h3>
                <p>
                    <a style={{color: '#6d7289'}} href="/map">New map!</a> <br />
                    <a style={{color: '#6d7289'}} href="/map">Timeline: Complete</a> <br />
                    <a style={{color: '#6d7289'}} href="/map">Locations and Nations Info</a>
                </p>
            </div>
            <div className="col-12 col-lg-4">
                <h3>
                    <img src={images('./icons8-questions-52.png').default} alt="Quizzes" />
                    Latest Quizzes
                </h3>
                <p>
                    <a style={{color: '#6d7289'}} href="/quizzes/Which_Talent_Would_You_Have">Which Talent Would You Have?</a> <br />
                    <a style={{color: '#6d7289'}} href="/quizzes/Which_Ta'veren_Are_You">Which Ta'veren Are You?</a> <br />
                    <a style={{color: '#6d7289'}} href="/quizzes/Which_Forsaken_Are_You">Which Forsaken Are You?</a>
                </p>
            </div>
            <div className="col-12 col-lg-4">
                <h3>
                    <img src={images('./icons8-blog-64.png').default} alt="Blog" />
                    Latest Blog Post
                </h3>
                <p>
                    <a style={{color: '#6d7289'}} href="/blog/Why_The_Eye_of_the_World_Works">Why The Eye of the World Works</a>
                </p>
            </div>
        </div>
    )
}

export default Announcement;