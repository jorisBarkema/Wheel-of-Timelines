import React from 'react';

import DateContainer from '../DateContainer.js'

var images = require.context('../../assets/event-icons', true);

class TimelineMajorEvent extends React.Component {

    render = () => {
        return this.props.double ? 
            <tr style={{backgroundColor: this.props.index % 2 === 0 ? "white" : "rgb(222, 222, 222)"}}>
                <td>
                    <DateContainer date={this.props.event.date === "" ? "" : this.dateToString(this.props.event.date)} />
                </td>
                <td>
                    <h3>{this.props.event.timeline_one ? this.props.event.title : null}</h3>
                </td>
                <td>
                    <p>{this.props.event.timeline_one ? this.props.event.description : null}</p>
                </td>
                <td>
                    <img src={images("./" + this.props.event.icon)} alt="Event icon" />
                </td>
                <td>
                    <h3>{this.props.event.timeline_two ? this.props.event.title : null}</h3>
                </td>
                <td>
                    <p>{this.props.event.timeline_two ? this.props.event.description : null}</p>
                </td>
            </tr>
            :
            <tr style={{backgroundColor: this.props.index % 2 === 0 ? "white" : "rgb(222, 222, 222)"}}>
                <td>
                    <DateContainer date={this.props.event.date === "" ? "" : this.dateToString(this.props.event.date)} />
                </td>
                <td>
                    <img src={images("./" + this.props.event.icon)} alt="Event icon" />
                </td>
                <td>
                    <h3>{this.props.event.title}</h3>
                </td>
                <td>
                    <p>{this.props.event.description}</p>
                </td>
            </tr>
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

export default TimelineMajorEvent