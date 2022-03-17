import React from 'react';

import DateContainer from '../DateContainer.js'

var images = require.context('../../assets/event-icons', true);

class EventContainer extends React.Component {

    render = () => {

        let icon = images("./" + this.props.event.icon).default;

        return (
            <div className={this.posToBSClasses(this.props.pos) + " event-container" + (this.props.blurred ? " blurred" : "")}>

                {
                    (this.props.event.hasOwnProperty("sponsor")) ? 
                    (<div className="top-container sponsor-container">
                        <p>Sponsored by {this.props.event.sponsor}</p>
                    </div>) : null
                }
                
                <div className="top-container date-container">
                    <DateContainer date={this.props.event.date === "" ? "" : this.dateToString(this.props.event.date)} />
                </div>

                <div className="title-container" style={{opacity: this.props.opacity}}>
                    <h2><img src={icon} alt={this.props.event.icon}></img>{this.props.event.title}</h2>
                </div>
                
                <div className="description-container" style={{opacity: this.props.opacity}}>
                    <p>{this.props.event.description}</p>
                </div>

            </div>
        )
    }

    posToBSClasses = (pos) => {
        if (pos === "center") {
            return "col-8 col-sm-4 center";
        }
        else if (pos === "side") {
            return "d-none d-sm-block col-sm-3 side";
        }

        else return "";
    }

    dateToString = (dateString) => {
        let date = new Date(dateString);

        if (!this.props.inUniverseDates) return date;

        let d = date.getDate();
        let m = date.getMonth();
        let y = date.getFullYear();

        let farede = "";

        switch(m) {
            case 0:
                if (d < 19) {
                    farede = "Taisham " + (d + 10) + ", " + y;
                } else {
                    farede = "Jumara " + (d - 18) + ", " + y;
                }
                break;
            case 1:
                if (d < 16) {
                    farede = "Jumara " + (d + 13) + ", " + y;
                } else {
                    farede = "Saban " + (d - 15) + ", " + y;
                }
                break;
            case 2:
                if (d < 16) {
                    farede = "Saban " + (d + 13) + ", " + y;
                } else {
                    farede = "Aine " + (d - 15) + ", " + y;
                }
                break;
            case 3:
                if (d < 13) {
                    farede = "Aine " + (d + 16) + ", " + y;
                } else {
                    farede = "Adar " + (d - 12) + ", " + y;
                }
                break;
            case 4:
                if (d < 11) {
                    farede = "Adar " + (d + 18) + ", " + y;
                } else {
                    farede = "Saven " + (d - 10) + ", " + y;
                }
                break;
            case 5:
                if (d < 8) {
                    farede = "Saven " + (d + 21) + ", " + y;
                } else if (d < 21) {
                    farede = "Amadaine " + (d - 7) + ", " + y;
                } else if (d === 21) {
                    farede = "Sunday " + y;
                } else {
                    farede = "Amadaine " + (d - 8) + ", " + y;
                }
                break;
            case 6:
                if (d < 7) {
                    farede = "Amadaine " + (d + 22) + ", " + y;
                } else {
                    farede = "Tammaz " + (d - 6) + ", " + y;
                }
                break;
            case 7:
                if (d < 4) {
                    farede = "Tammaz " + (d + 25) + ", " + y;
                } else {
                    farede = "Maighdal " + (d - 3) + ", " + y;
                }
                break;
            case 8:
                if (d < 29) {
                    farede = "Choren " + d + ", " + y;
                } else {
                    farede = "Shaldine " + (d - 28) + ", " + y;
                }
                break;
            case 9:
                if (d < 27) {
                    farede = "Shaldine " + (d + 2) + ", " + y;
                } else {
                    farede = "Nesan " + (d - 26) + ", " + y;
                }
                break;
            case 10:
                if (d < 24) {
                    farede = "Nesan " + (d + 5) + ", " + y;
                } else {
                    farede = "Danu " + (d - 23) + ", " + y;
                }
                break;
            case 11:
                if (d < 22) {
                    farede = "Danu " + (d + 7) + ", " + y;
                } else {
                    farede = "Taisham " + (d - 21) + ", " + (y + 1);
                }
                break;
            default: farede = "";                                                                                                                                                                                        
        }


        return farede;
    }
}

export default EventContainer;