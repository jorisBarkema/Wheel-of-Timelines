import React from 'react';
//import ReactGA from 'react-ga';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Button from '@material-ui/core/Button';

//var images = require.context('../../assets', true);

class TimelineSettings extends React.Component {

    render = () => {
        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.inUniverseDates} onChange={() => this.props.handleDatesChange()} color="primary" value="secondary"/>
                        }
                        label="Use Westlands Farede calendar"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.showMinorEvents} onChange={() => this.props.handleMinorEventsChange()} color="primary" value="secondary"/>
                        }
                        label="Show minor events"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.showTwoTimelines} onChange={() => this.props.handleTwoTimelinesChange()} color="primary" value="secondary"/>
                        }
                        label="Show two timelines for different characters"
                    />
                </div>
            </div>
        )
    }
}

export default TimelineSettings