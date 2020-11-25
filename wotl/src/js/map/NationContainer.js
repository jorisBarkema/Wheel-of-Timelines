import React from 'react';
import {isMobile} from 'react-device-detect';

import {nations} from '../../data/nations.json';

var images = require.context('../../assets', true);

class NationContainer extends React.Component {

    render = () => {

        let close_icon = images("./icons8-close-window-52.png").default;

        return (
            <div id="location-container" className="row map-info">
                {isMobile ? <h2>{this.props.name}</h2> : null}
                <div id="location-image" className={isMobile ? "col-12" : "col-4"}>
                    <div style={{height: '100%', width: '100%'}}>
                        <img src={images("./flags/" + nations[this.props.name].flag).default} alt={this.props.name + " flag"} /> <br />
                        <span className="credit"><a href={nations[this.props.name].flagSource}>image source</a> by {nations[this.props.name].flagCredit}</span>
                    </div>
                </div>
                <div id="location-description" className={isMobile ? "col-12" : "col-6"}>
                    {isMobile ? null : <h2>{this.props.name}</h2>}
                    <p> 
                        {nations[this.props.name].description}
                        <br />
                        <br />
                        <span className="credit" style={{fontSize: "11px"}}>Want to know more? Check <a href={nations[this.props.name].wikiLink}>the WoT wiki</a></span>
                    </p>
                </div>

                <div id="close-location" onClick={() => this.closeNation()}>
                    <img src={close_icon} alt="Close location" />
                </div>
            </div>
        )
    }

    closeNation = () => {
        this.props.onShowingNationChange();
    }

    goToEvent = (nr) => {
        this.props.goToEvent(nr);
    }
}

export default NationContainer;