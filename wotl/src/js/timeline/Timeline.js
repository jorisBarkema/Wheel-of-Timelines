import React from 'react';
//import Button from '@material-ui/core/Button';

import TimelineMajorEvent from './TimelineMajorEvent.js'
import TimelineMetaEvent from './TimelineMetaEvent.js'
import TimelineMinorEvent from './TimelineMinorEvent.js'

class Timeline extends React.Component {

    render = () => {
        return (
            <table id="timeline-table">
                {
                    this.props.double ? 
                    <colgroup>
                        <col style={{width: "15%"}}/>
                        <col style={{width: "10%"}}/>
                        <col style={{width: "30%"}}/>
                        <col style={{width: "5%"}}/>
                        <col style={{width: "10%"}}/>
                        <col style={{width: "30%"}}/>
                    </colgroup>
                    :
                    <colgroup>
                        <col style={{width: "15%"}}/>
                        <col style={{width: "0%"}}/>
                        <col style={{width: "30%"}}/>
                        <col style={{width: "65%"}}/>
                    </colgroup>
                }

                <thead>
                    {
                        this.props.double ? 
                        <tr>
                            <th>Date</th>
                            <th colSpan="2">Event</th>
                            <th></th>
                            <th colSpan="2">Event</th>
                        </tr>
                        :
                        <tr>
                            <th>Date</th>
                            <th></th>
                            <th colSpan="2">Event</th>
                        </tr>
                    }
                </thead>
                <tbody id="timeline-table-body">
                    {
                        Object.keys(this.props.events).map((key, index) => {
                            if (this.props.events[key].type === "major") return <TimelineMajorEvent double={this.props.double} event={this.props.events[key]} key={index} index={index} inUniverseDates={this.props.inUniverseDates}/>
                            if (this.props.events[key].type === "meta") return <TimelineMetaEvent double={this.props.double} event={this.props.events[key]} key={index} index={index} inUniverseDates={this.props.inUniverseDates}/>
                            if (this.props.events[key].type === "minor") return <TimelineMinorEvent double={this.props.double} event={this.props.events[key]} key={index} index={index} inUniverseDates={this.props.inUniverseDates}/>

                            return null;
                        })
                    }
                </tbody>
            </table>
        )
    }
}
//teotw-alt.jpg
export default Timeline;