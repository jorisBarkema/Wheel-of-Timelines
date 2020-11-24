import React from 'react';
//import ReactGA from 'react-ga';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

//var images = require.context('../../assets', true);

class TimelineBookFilters extends React.Component {

    render = () => {
        return (
            <div className="row">
                <div className="col-12">
                    <Button onClick={() => this.handleShowAll()} variant="outlined" color="primary">Show all</Button>
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[0]} onChange={() => this.handleFilterChange(0)} color="primary" value="secondary"/>
                        }
                        label="1 - The Eye of the World"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[1]} onChange={() => this.handleFilterChange(1)} color="primary" value="secondary"/>
                        }
                        label="2 - The Great Hunt"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[2]} onChange={() => this.handleFilterChange(2)} color="primary" value="secondary"/>
                        }
                        label="3 - The Dragon Reborn"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[3]} onChange={() => this.handleFilterChange(3)} color="primary" value="secondary"/>
                        }
                        label="4 - The Shadow Rising"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[4]} onChange={() => this.handleFilterChange(4)} color="primary" value="secondary"/>
                        }
                        label="5 - The Fires of Heaven"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[5]} onChange={() => this.handleFilterChange(5)} color="primary" value="secondary"/>
                        }
                        label="6 - Lord of Chaos"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[6]} onChange={() => this.handleFilterChange(6)} color="primary" value="secondary"/>
                        }
                        label="7 - A Crown of Swords"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[7]} onChange={() => this.handleFilterChange(7)} color="primary" value="secondary"/>
                        }
                        label="8 - The Path of Daggers"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[8]} onChange={() => this.handleFilterChange(8)} color="primary" value="secondary"/>
                        }
                        label="9 - Winter's Heart"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[9]} onChange={() => this.handleFilterChange(9)} color="primary" value="secondary"/>
                        }
                        label="10 - Crossroads of Twilight"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[10]} onChange={() => this.handleFilterChange(10)} color="primary" value="secondary"/>
                        }
                        label="11 - Knife of Dreams"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[11]} onChange={() => this.handleFilterChange(11)} color="primary" value="secondary"/>
                        }
                        label="12 - The Gathering Storm"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[12]} onChange={() => this.handleFilterChange(12)} color="primary" value="secondary"/>
                        }
                        label="13 - Towers of Midnight"
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.props.filterChecks[13]} onChange={() => this.handleFilterChange(13)} color="primary" value="secondary"/>
                        }
                        label="14 - A Memory of Light"
                    />
                </div>
            </div>
        )
    }

    handleShowAll = () => {
        this.props.onShowAll();
    }

    handleFilterChange = (v) => {
        this.props.onFilterChange(v);
    }
}

export default TimelineBookFilters