import React from 'react';
import {isMobile} from 'react-device-detect';

import {locations} from '../../data/locations.json';

var images = require.context('../../assets', true);

class LocationContainer extends React.Component {

    render = () => {

        let close_icon = images("./icons8-close-window-52.png");

        let className = isMobile ? "col-12" : "col-4";

        return (
            <div id="location-container" className="row map-info">
                {isMobile ? <h2>{this.props.name}</h2> : null}
                {locations[this.props.name].hasOwnProperty("image") ?
                    <div id="location-image" className={className}>
                     
                        <div style={{height: '100%', width: '100%'}}>
                            <img src={images("./locations/" + locations[this.props.name].image)} alt={this.props.name + " image"} /> <br />
                            <span className="credit"><a href={locations[this.props.name].imageSource}>image source</a> by {locations[this.props.name].imageCredit}</span>
                        </div>
                        
                    </div>
                : (isMobile ? null : <div id="location-image" className={className} />)}
                <div id="location-description" className={className}>
                    {isMobile ? null : <h2>{this.props.name}</h2>}
                    <p> 
                        {locations[this.props.name].description}
                        <br />
                        <br />
                        {locations[this.props.name].hasOwnProperty("wikiLink") ? 
                                <span className="credit" style={{fontSize: "11px"}}>Want to know more? Check <a href={locations[this.props.name].wikiLink}>the WoT wiki</a> (may contain spoilers!)</span>
                        : null}
                    </p>
                </div>

                <div id="location-events" className={className}>
                {this.props.events.length === 0 ? null : <h2>Timeline events</h2>}
                    {this.props.events.map((eventpair, index) => {
                        return (
                            <div key={index} className="row location-event-container" onClick={() => this.goToEvent(eventpair.number)}>
                                <div className="col-12 col-md-5 col-xl-3">
                                    <img src={images("./event-icons/" + eventpair.event.icon)} alt="icon"/>
                                </div>
                                <div className="col-12 col-md-7 col-xs-9">
                                    <h3>{eventpair.event.title}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div id="close-location" onClick={() => this.closeLocation()}>
                    <img src={close_icon} alt="Close location" />
                </div>
            </div>
        )
    }

    closeLocation = () => {
        this.props.onShowingLocationChange();
    }

    goToEvent = (nr) => {
        this.props.goToEvent(nr);
    }
}

export default LocationContainer;