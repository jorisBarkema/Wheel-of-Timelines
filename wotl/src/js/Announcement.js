import React from 'react';

var images = require.context('../assets', true);

function Announcement() {
    return (
        <div id="announcement" className="row">
            <div className="col-12 col-lg-4">
                <h3>
                    <img src={images('./icons8-map-marker-52.png')} alt="Map" />
                    Latest Map Update
                </h3>
                <p>
                    <a style={{color: '#6d7289'}} href="/map">Routes: Crossroads of Twilight</a> <br />
                    <a style={{color: '#6d7289'}} href="/map">Timeline: Complete!</a> <br />
                    <a style={{color: '#6d7289'}} href="/map">Locations and Nations Info</a>
                </p>
            </div>
            <div className="col-12 col-lg-4">
                <h3>
                    <img src={images('./icons8-questions-52.png')} alt="Quizzes" />
                    Latest Quizzes
                </h3>
                <p>
                    <a style={{color: '#6d7289'}} href="/quizzes/Can_You_Place_Every_Flag">Can You Place Every Flag?</a> <br />
                    <a style={{color: '#6d7289'}} href="/quizzes/Which_Forsaken_Are_You">Which Forsaken Are You?</a>
                </p>
            </div>
            <div className="col-12 col-lg-4">
                <h3>
                    <img src={images('./icons8-blog-64.png')} alt="Blog" />
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