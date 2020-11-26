import React from 'react';
import {isMobile} from 'react-device-detect';

import {regions} from '../../data/regions.json';

var images = require.context('../../assets/', true);

class RegionContainer extends React.Component {

    render = () => {

        let close_icon = images("./icons8-close-window-52.png").default;
        
        let image = regions[this.props.name].image === undefined ? null : images("./regions/" + regions[this.props.name].image).default;

        return (
            <div id="location-container" className="row map-info">
                {isMobile ? <h2>{this.props.name}</h2> : null}
                <div id="location-image" className={isMobile ? "col-12" : "col-4"}>
                    {
                        image === null ? null :
                        (<div style={{height: '100%', width: '100%'}}>
                            <img src={image} alt={this.props.name + " flag"} /> <br />
                            <span className="credit"><a href={regions[this.props.name].imageSource}>image source</a> by {regions[this.props.name].imageCredit}</span>
                        </div>)
                    }
                </div>
                <div id="location-description" className={isMobile ? "col-12" : "col-6"}>
                    {isMobile ? null : <h2>{this.props.name}</h2>}
                    <p> 
                        {regions[this.props.name].description}
                        <br />
                        <br />
                        <span className="credit" style={{fontSize: "11px"}}>Want to know more? Check <a href={regions[this.props.name].wikiLink}>the WoT wiki</a></span>
                    </p>
                </div>

                <div id="close-location" onClick={() => this.closeRegion()}>
                    <img src={close_icon} alt="Close location" />
                </div>
            </div>
        )
    }

    closeRegion = () => {
        this.props.onShowingRegionChange();
    }

    goToEvent = (nr) => {
        this.props.goToEvent(nr);
    }
}

export default RegionContainer;