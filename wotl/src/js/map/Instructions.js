import React from 'react';

var images = require.context('../../assets', true);

function Instructions(props) {

    return (
        <div id="instructions" className="d-none d-sm-block col-sm-3 event-container">
            <h2>Welcome to the Wheel of Timelines map!</h2>
            <p>
                If you like this website, please support it via <span style={{display: "inline-block"}}><a href="https://www.patreon.com/wheeloftimelines"><img className="inline-img" src={images('./patreon-logo.png')} alt="Patreon" /> Patreon</a></span>,
                it really makes a difference!< br />
                <br />
                In the <span style={{display: "inline-block"}}><img src={images('./icons8-settings-48.png')} alt="Filters" /> Settings menu</span> you can show or hide the timeline and the character routes along with some other customisation options. <br />
                <br />
                If you have not finished the series yet or just want to see a specific selection from the timeline, you can filter out events from whichever books you want.
                Just want to follow a certain character? This is also possible with the character filters.< br />
                <br />
                If you are curious about a city or country, you can click on it to learn more about it, and for the countries to see the borders light up on the map.
            </p>
        </div> 
    )
}

export default Instructions;