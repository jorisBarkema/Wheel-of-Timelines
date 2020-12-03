import React from 'react';
//import ReactGA from 'react-ga';
//import { PayPalButton } from "react-paypal-button-v2";
import DownloadLink from "react-download-link";

import {
    FacebookShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

import {
    FacebookIcon,
    RedditIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

import Patron from './Patron.js';

var images = require.context('../assets', true);
var data = require.context('../data', false);

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donationAmount: 5
        };
    }

    render = () => {

        let wheel_src = images("./Wheel-icon.svg").default;
        let patreon_src = images("./become_a_patron_button.png").default;

        return (
            <div id="footer" className="card-columns">
                <div className="card left-image-container">
                    <div id="text" className="row">
                        <h1>Wheel of Time</h1><br /><br />
                        <p className="col-12"> This is an unofficial fan-made website and has no connection to Tor Books or the Robert Jordan estate.</p>
                    </div>
                    <img src={wheel_src} alt="Wheel of Time"></img>
                </div>

                <div className="card">
                    <div id="text">
                        <h1>Become a patron for exclusive perks</h1>
                    </div>
                    <div id="patreon">
                        <a href="https://www.patreon.com/wheeloftimelines?fan_landing=true" target="_blank" rel="noopener noreferrer"><img id="patreon" src={patreon_src} alt="Wheel of Timelines" /></a>
                    </div>
                </div>
                
                <div id="share-icons" className="card">
                    <div className="row">
                        <div id="text">
                            <h1>Share this website</h1>
                            <div className="col-12">
                                <div className="share-icon-container">
                                    <RedditShareButton url={String(window.location)} quote="Wheel of Timelines" >
                                        <RedditIcon size={25} round />
                                    </RedditShareButton>
                                </div>
                                <div className="share-icon-container">
                                    <FacebookShareButton url={String(window.location)} quote="Wheel of Timelines" >
                                        <FacebookIcon size={25} round />
                                    </FacebookShareButton>
                                </div>
                                <div className="share-icon-container">
                                    <WhatsappShareButton url={String(window.location)} quote="Wheel of Timelines" >
                                        <WhatsappIcon size={25} round />
                                    </WhatsappShareButton>
                                </div>
                                <div className="share-icon-container">
                                    <TwitterShareButton url={String(window.location)} quote="Wheel of Timelines" >
                                        <TwitterIcon size={25} round />
                                    </TwitterShareButton>
                                </div>
                                <div className="share-icon-container">
                                    <TumblrShareButton url={String(window.location)} quote="Wheel of Timelines" >
                                        <TumblrIcon size={25} round />
                                    </TumblrShareButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                
                <div className="card">
                    <h1>Patrons</h1>
                    <div className="row">
                        <Patron name="Don Singles"/>
                        <Patron name="Scott Therens"/>
                        <Patron name="Tommi Murto"/>
                        <Patron name="Lauren from Unraveling the Pattern"/>
                        <Patron name="Konstantin Ivanov"/>
                        <Patron name="Kim"/>
                        <Patron name="Ned Winand"/>
                        <Patron name="Tyhjyys Rules"/>
                    </div>
                </div>

                <div className="card">
                    <h1>Credits</h1>
                    <div className="row">
                        <div id="text" className="col-12">
                            <p><a href="http://jcsalomon.github.io/wot-chapter-icons/">Chapter icons</a> from JCSalomon</p>
                            <p>Font of the banner: <a href="http://artsyomni.com/hyliaserif/download">Hyliaserif</a> by artsyomni</p>
                            <p>Icons from <a href="https://icons8.com">Icons8</a></p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h1>Data</h1>
                    <div id="text">
                        <div className="row">
                            <div className="col-12">
                                <p>
                                    All of the data for the timeline and the map is freely available with license CC BY-SA 4.0.
                                </p>
                            </div>
                            <div className="col-12 col-lg-6 download-link">
                                <DownloadLink
                                    label="events.json"
                                    filename="events.json"
                                    exportFile={() => JSON.stringify(data("./events.json"), null, "\t")}
                                />
                            </div>
                            <div className="col-12 col-lg-6 download-link">
                                <DownloadLink
                                    label="locations.json"
                                    filename="locations.json"
                                    exportFile={() => JSON.stringify(data("./locations.json"), null, "\t")}
                                />
                            </div>
                            <div className="col-12 col-lg-6 download-link">
                                <DownloadLink
                                    label="regions.json"
                                    filename="regions.json"
                                    exportFile={() => JSON.stringify(data("./regions.json"), null, "\t")}
                                />
                            </div>
                            <div className="col-12 col-lg-6 download-link">
                                <DownloadLink
                                    label="paths.json"
                                    filename="paths.json"
                                    exportFile={() => JSON.stringify(data("./paths.json"), null, "\t")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    changeDonationAmount = () => {
        
        this.setState({
            donationAmount: document.getElementsByName("amount")[0].value
        })
    }
}

export default Header;