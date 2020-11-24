import React from 'react';
//import ReactGA from 'react-ga';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//var images = require.context('../../assets', true);

class TimelineCharacterFilters extends React.Component {

    constructor(props) {
        super(props);
        //this.handleFilterChange = this.handleFilterChange.bind(this);

        this.state = {
            filterChecks: {
                "Rand": true,
                "Perrin": true,
                "Mat": true,
                "Egwene": true,
                "Nynaeve": true,
                "Moiraine": true,
                "Lan": true,
                "Thom": true,
                "Others": true
            }
        }
    }

    render = () => {
        return (
            <div className="row">
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Rand"]} onChange={() => this.handleFilterChange("Rand")} color="primary" value="secondary"/>
                        }
                        label="Rand"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Perrin"]} onChange={() => this.handleFilterChange("Perrin")} color="primary" value="secondary"/>
                        }
                        label="Perrin"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Mat"]} onChange={() => this.handleFilterChange("Mat")} color="primary" value="secondary"/>
                        }
                        label="Mat"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Egwene"]} onChange={() => this.handleFilterChange("Egwene")} color="primary" value="secondary"/>
                        }
                        label="Egwene"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Nynaeve"]} onChange={() => this.handleFilterChange("Nynaeve")} color="primary" value="secondary"/>
                        }
                        label="Nynaeve"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Moiraine"]} onChange={() => this.handleFilterChange("Moiraine")} color="primary" value="secondary"/>
                        }
                        label="Moiraine"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Lan"]} onChange={() => this.handleFilterChange("Lan")} color="primary" value="secondary"/>
                        }
                        label="Lan"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Thom"]} onChange={() => this.handleFilterChange("Thom")} color="primary" value="secondary"/>
                        }
                        label="Thom"
                    />
                </div>
                <div className="col-6 col-lg-4">
                    <FormControlLabel
                        control={
                        <Checkbox checked={this.state.filterChecks["Others"]} onChange={() => this.handleFilterChange("Others")} color="primary" value="secondary"/>
                        }
                        label="Others"
                    />
                </div>
            </div>
        )
    }

    handleFilterChange = (v) => {

        let newChecks = this.state.filterChecks;
        newChecks[v] = !newChecks[v];

        this.setState({
            filterChecks: newChecks
        })

        this.props.onFilterChange(v);
    }
}

export default TimelineCharacterFilters