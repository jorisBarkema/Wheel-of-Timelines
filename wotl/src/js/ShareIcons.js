import React from 'react'

import {
    FacebookShareButton,
    PinterestShareButton,
    RedditShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";

import {
    FacebookIcon,
    PinterestIcon,
    RedditIcon,
    TumblrIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

class ShareIcons extends React.Component {

    render = () => {

        return (
            <div id="share-container" className="row">
                <div className="col-6 col-md-4 col-xl-2 share-icon-container">
                    <RedditShareButton url={String(window.location)} quote="Wheel of Timelines" >
                        <RedditIcon size={25} round />
                    </RedditShareButton>
                </div>
                <div className="col-6 col-md-4 col-xl-2 share-icon-container">
                    <FacebookShareButton url={String(window.location)} quote="Wheel of Timelines" >
                        <FacebookIcon size={25} round />
                    </FacebookShareButton>
                </div>
                <div className="col-6 col-md-4 col-xl-2 share-icon-container">
                    <WhatsappShareButton url={String(window.location)} quote="Wheel of Timelines" >
                        <WhatsappIcon size={25} round />
                    </WhatsappShareButton>
                </div>
                <div className="col-6 col-md-4 col-xl-2 share-icon-container">
                    <TwitterShareButton url={String(window.location)} quote="Wheel of Timelines" >
                        <TwitterIcon size={25} round />
                    </TwitterShareButton>
                </div>
                <div className="col-6 col-md-4 col-xl-2 share-icon-container">
                    <PinterestShareButton url={String(window.location)} quote="Wheel of Timelines" >
                        <PinterestIcon size={25} round />
                    </PinterestShareButton>
                </div>
                <div className="col-6 col-md-4 col-xl-2 share-icon-container">
                    <TumblrShareButton url={String(window.location)} quote="Wheel of Timelines" >
                        <TumblrIcon size={25} round />
                    </TumblrShareButton>
                </div>
            </div>
        )
    }
}

export default ShareIcons