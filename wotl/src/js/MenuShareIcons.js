import React from 'react'

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

class MenuShareIcons extends React.Component {

    render = () => {

        let id = this.props.first ? "menu-first-container" : "";

        return (
            <div className="menu-container" id={id}>
                <h2>{this.props.shareMessage}</h2>
                <div className="menu-div">
                    <div className="share-icon-container">
                        <RedditShareButton url={String(window.location)} title="Wheel of Timelines" >
                            <RedditIcon size={25} round />
                        </RedditShareButton>
                    </div>
                    <div className="share-icon-container">
                        <FacebookShareButton url={String(window.location)} quote="Wheel of Timelines" >
                            <FacebookIcon size={25} round />
                        </FacebookShareButton>
                    </div>
                    <div className="share-icon-container">
                        <WhatsappShareButton url={String(window.location)} title="Wheel of Timelines" >
                            <WhatsappIcon size={25} round />
                        </WhatsappShareButton>
                    </div>
                    <div className="share-icon-container">
                        <TwitterShareButton url={String(window.location)} title="Wheel of Timelines" >
                            <TwitterIcon size={25} round />
                        </TwitterShareButton>
                    </div>
                    <div className="share-icon-container">
                        <TumblrShareButton url={String(window.location)} title="Wheel of Timelines" >
                            <TumblrIcon size={25} round />
                        </TumblrShareButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuShareIcons