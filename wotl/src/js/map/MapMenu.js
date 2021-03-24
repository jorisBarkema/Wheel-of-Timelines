import React from 'react';
import ReactGA from 'react-ga';
import { slide as Menu } from 'react-burger-menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';

import MenuButton from '../MenuButton.js';
import MenuShareIcons from '../MenuShareIcons.js'
import PatreonMenuContainer from '../PatreonMenuContainer.js';

const cookies = new Cookies();

var images = require.context('../../assets', true);

class MapMenu extends React.Component {

    constructor(props) {
        super(props);
        //this.handleBookFilterChange = this.handleBookFilterChange.bind(this);
        
        let useCookies = cookies.get('useCookies') === 'true';

        this.state = {
            bookFilterChecks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(x => (useCookies && cookies.get('book'+ x + 'Filter') !== undefined) ? cookies.get('book'+ x + 'Filter') === 'true' : true),
            characterFilterChecks: {
                "Rand": (useCookies && cookies.get('RandFilter') !== undefined) ? cookies.get('RandFilter') === 'true' : true,
                "Perrin": (useCookies && cookies.get('PerrinFilter') !== undefined) ? cookies.get('PerrinFilter') === 'true' : true,
                "Mat": (useCookies && cookies.get('MatFilter') !== undefined) ? cookies.get('MatFilter') === 'true' : true,
                "Egwene": (useCookies && cookies.get('EgweneFilter') !== undefined) ? cookies.get('EgweneFilter') === 'true' : true,
                "Nynaeve": (useCookies && cookies.get('NynaeveFilter') !== undefined) ? cookies.get('NynaeveFilter') === 'true' : true,
                "Moiraine": (useCookies && cookies.get('MoiraineFilter') !== undefined) ? cookies.get('MoiraineFilter') === 'true' : true,
                "Lan": (useCookies && cookies.get('LanFilter') !== undefined) ? cookies.get('LanFilter') === 'true' : true,
                "Thom": (useCookies && cookies.get('ThomFilter') !== undefined) ? cookies.get('ThomFilter') === 'true' : true,
                "Others": (useCookies && cookies.get('OthersFilter') !== undefined) ? cookies.get('OthersFilter') === 'true' : true,
            },
            showingLines: (useCookies && cookies.get('showingLines') !== undefined) ? cookies.get('showingLines') === 'true' : true,
            showingTimeline: (useCookies && cookies.get('showingTimeline') !== undefined) ? cookies.get('showingTimeline') === 'true' : true,
            showingBorders: (useCookies && cookies.get('showingBorders') !== undefined) ? cookies.get('showingBorders') === 'true' : false,
            inUniverseDates: (useCookies && cookies.get('inUniverseDates') !== undefined) ? cookies.get('inUniverseDates') === 'true' : false,
            hd: props.hd,
            showText: props.showText,
            showStedding: props.showStedding,
            showPortalStones: props.showPortalStones,
            showRivers: props.showRivers,
            lastCopiedEvent: -1
        }
    }

    handleSkipToEnd = () => {

        console.log("clicked on skip to end");

        this.props.skipToEnd();

        ReactGA.event({
            category: 'Map',
            action: 'Skipped to end'
        });
    }

    handleBookFilterChange = (v) => {

        let newChecks = this.state.bookFilterChecks;
        newChecks[v] = !newChecks[v];

        this.setState({
            bookFilterChecks: newChecks
        })

        this.props.onBookFilterChange(v);
    }

    handleCharacterFilterChange = (v) => {
        let newChecks = this.state.characterFilterChecks;

        newChecks[v] = !newChecks[v];

        this.setState({
            characterFilterChecks: newChecks
        })

        this.props.onCharacterFilterChange(v);
    }

    handleTimelineChange = () => {

        this.setState({
            showingTimeline: !this.state.showingTimeline
        })

        this.props.onTimelineChange();
    }

    handleLineChange = () => {
        this.setState({
            showingLines: !this.state.showingLines
        })

        this.props.onLineChange();
    }

    handleShowingBordersChange = () => {
        this.setState({
            showingBorders: !this.state.showingBorders
        })

        this.props.onBordersChange();
    }

    handleDatesChange = () => {
        this.setState({
            inUniverseDates: !this.state.inUniverseDates
        })

        this.props.onDatesChange();
    }

    handleDefinitionChange = () => {
        this.setState({
            hd: !this.state.hd
        })

        this.props.onDefinitionChange();
    }

    handleShowTextChange = () => {
        this.setState({
            showText: !this.state.showText
        })

        this.props.onShowTextChange();
    }

    handleShowSteddingChange = () => {
        this.setState({
            showStedding: !this.state.showStedding
        })
        
        this.props.onShowSteddingChange();
    }

    handleShowPortalStonesChange = () => {
        this.setState({
            showPortalStones: !this.state.showPortalStones
        })

        this.props.onShowPortalStonesChange();
    }

    handleShowRiversChange = () => {
        this.setState({
            showRivers: !this.state.showRivers
        })

        this.props.onShowRiversChange();
    }

    render = () => {

        return (
            <div>
                <div className="left-menu">
                    <Menu disableAutoFocus>
                        <MenuButton text="Home" link="/"></MenuButton>
                        <MenuButton text="Map" link="/map"></MenuButton>
                        <MenuButton text="Quizzes" link="/quizzes"></MenuButton>
                        <MenuButton text="Blog" link="/blog"></MenuButton>
                        <MenuButton text="Timeline" link="/timeline"></MenuButton>

                        <MenuShareIcons shareMessage="Share this website!"/>

                        <div className="menu-container">
                            <p>Or share this position of the timeline by copying a link to the current event</p>

                            <IconButton color="primary" aria-label="share link"
                            onClick={() => {
                                //setClipboard('https://wheeloftimelines.com/map?event=' + props.getCurrentEventId());
                                const copyToClipboard = (str) => {
                                    const el = document.createElement('textarea');
                                    el.value = str;
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(el);
                                };

                                copyToClipboard('https://wheeloftimelines.com/map?event=' + this.props.getCurrentEventId());
                                
                                this.setState({
                                    lastCopiedEvent: this.props.getCurrentEventId()
                                });

                            }}>
                                <AssignmentIcon />
                            </IconButton>

                            {this.state.lastCopiedEvent === this.props.getCurrentEventId()? "Copied!" : "Copy link"} 
                        </div>

                        <PatreonMenuContainer />

                        <div className="menu-container" id="credits-icons-container">
                            <h2>Credits</h2>

                            <div className="menu-div">
                                <p><a href={images("./Map-with-colours.png").default}>The old version of the map</a> of the Westlands and the Aiel Waste is still available. For the full new vesion message me on Patreon, as its filesize is too large to host here.</p>
                                <p>The Westlands portion of the map is based on the map by <a href="https://atlasoficeandfireblog.files.wordpress.com/2016/08/wheel-of-time-colour-map.jpg?w=768">Ellisa Mitchell</a></p>
                                <p>The Aiel Waste portion of the map is based on the map from <a href="https://atlasoficeandfireblog.wordpress.com/2018/09/23/the-wheel-of-time-atlas-the-aiel-waste/">this article</a></p>
                                <p>Font of the map: <a href="http://artsyomni.com/hyliaserif/download">Hyliaserif</a> by artsyomni</p>
                                <p><a href="http://jcsalomon.github.io/wot-chapter-icons/">Chapter icons</a> from JCSalomon</p>
                                <p>Most of the dates from the timeline (for books 1-12) are based on the timeline from <a href="http://www.stevenac.net/wot/wotchron.htm">Steven Cooper</a></p>
                                <p>Icons from <a href="https://icons8.com">Icons8</a></p>
                            </div>
                        </div>
                    </Menu>
                </div>

                
                <div id="map-menu-container" className='right-menu'>
                    <Menu disableAutoFocus right>
                        <div className="menu-container" id="menu-first-container">

                            <h3>
                                <img src={images('./icons8-map-marker-grey-52.png').default} alt="Map" />
                                Latest Map Update
                            </h3>

                            <div className="update-container menu-div">
                                <p>
                                    <b>Timeline status</b> <br />
                                    Routes: Complete <br />
                                    Timeline: Complete <br /> 
                                    <br />
                                    To show all the routes<br />
                                    <span style={{color: "red"}} > <b>Spoilers</b> for selected books </span> <br />
                                    <Button onClick={() => this.handleSkipToEnd()} variant="outlined">Skip to end</Button>
                                </p>
                            </div>

                            <h2>
                                <img src={images('./icons8-settings-grey-48.png').default} alt="Settings" />
                                Settings
                            </h2>

                            <div className="menu-div">
                                <form>
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showText} onChange={() => this.handleShowTextChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show text"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showStedding} onChange={() => this.handleShowSteddingChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show Stedding"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showPortalStones} onChange={() => this.handleShowPortalStonesChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show portal stones"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showRivers} onChange={() => this.handleShowRiversChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show river names"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showingTimeline} onChange={() => this.handleTimelineChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show timeline"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showingLines} onChange={() => this.handleLineChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show travel routes"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.showingBorders} onChange={() => this.handleShowingBordersChange()} color="primary" value="secondary"/>
                                        }
                                        label="Show all nation borders"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.inUniverseDates} onChange={() => this.handleDatesChange()} color="primary" value="secondary"/>
                                        }
                                        label="Use Westlands Farede calendar"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.hd} onChange={() => this.handleDefinitionChange()} color="primary" value="secondary"/>
                                        }
                                        label="High definition map"
                                    />
                                </form>
                            </div>
                            
                            <h2>
                                <img src={images('./icons8-book-stack-52-grey.png').default} alt="Book Filters" />
                                Book Filters
                            </h2>

                            <div className="menu-div">
                                <form>
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[0]} onChange={() => this.handleBookFilterChange(0)} color="primary" value="secondary"/>
                                        }
                                        label="1 - The Eye of the World"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[1]} onChange={() => this.handleBookFilterChange(1)} color="primary" value="secondary"/>
                                        }
                                        label="2 - The Great Hunt"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[2]} onChange={() => this.handleBookFilterChange(2)} color="primary" value="secondary"/>
                                        }
                                        label="3 - The Dragon Reborn"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[3]} onChange={() => this.handleBookFilterChange(3)} color="primary" value="secondary"/>
                                        }
                                        label="4 - The Shadow Rising"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[4]} onChange={() => this.handleBookFilterChange(4)} color="primary" value="secondary"/>
                                        }
                                        label="5 - The Fires of Heaven"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[5]} onChange={() => this.handleBookFilterChange(5)} color="primary" value="secondary"/>
                                        }
                                        label="6 - Lord of Chaos"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[6]} onChange={() => this.handleBookFilterChange(6)} color="primary" value="secondary"/>
                                        }
                                        label="7 - A Crown of Swords"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[7]} onChange={() => this.handleBookFilterChange(7)} color="primary" value="secondary"/>
                                        }
                                        label="8 - The Path of Daggers"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[8]} onChange={() => this.handleBookFilterChange(8)} color="primary" value="secondary"/>
                                        }
                                        label="9 - Winter's Heart"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[9]} onChange={() => this.handleBookFilterChange(9)} color="primary" value="secondary"/>
                                        }
                                        label="10 - Crossroads of Twilight"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[10]} onChange={() => this.handleBookFilterChange(10)} color="primary" value="secondary"/>
                                        }
                                        label="11 - Knife of Dreams"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[11]} onChange={() => this.handleBookFilterChange(11)} color="primary" value="secondary"/>
                                        }
                                        label="12 - The Gathering Storm"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[12]} onChange={() => this.handleBookFilterChange(12)} color="primary" value="secondary"/>
                                        }
                                        label="13 - Towers of Midnight"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.bookFilterChecks[13]} onChange={() => this.handleBookFilterChange(13)} color="primary" value="secondary"/>
                                        }
                                        label="14 - A Memory of Light"
                                    />
                                </form>
                            </div>

                            <h2>
                                <img src={images('./icons8-person-48-grey.png').default} alt="Character Filters" />
                                Character Filters
                            </h2>

                            <div className="menu-div">
                                <form>
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Rand"]} onChange={() => this.handleCharacterFilterChange("Rand")} color="primary" value="secondary"/>
                                        }
                                        label="Rand"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Mat"]} onChange={() => this.handleCharacterFilterChange("Mat")} color="primary" value="secondary"/>
                                        }
                                        label="Mat"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Perrin"]} onChange={() => this.handleCharacterFilterChange("Perrin")} color="primary" value="secondary"/>
                                        }
                                        label="Perrin"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Egwene"]} onChange={() => this.handleCharacterFilterChange("Egwene")} color="primary" value="secondary"/>
                                        }
                                        label="Egwene"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Nynaeve"]} onChange={() => this.handleCharacterFilterChange("Nynaeve")} color="primary" value="secondary"/>
                                        }
                                        label="Nynaeve"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Moiraine"]} onChange={() => this.handleCharacterFilterChange("Moiraine")} color="primary" value="secondary"/>
                                        }
                                        label="Moiraine"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Lan"]} onChange={() => this.handleCharacterFilterChange("Lan")} color="primary" value="secondary"/>
                                        }
                                        label="Lan"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Thom"]} onChange={() => this.handleCharacterFilterChange("Thom")} color="primary" value="secondary"/>
                                        }
                                        label="Thom"
                                    />
                                    <FormControlLabel
                                        control={
                                        <Checkbox checked={this.state.characterFilterChecks["Others"]} onChange={() => this.handleCharacterFilterChange("Others")} color="primary" value="secondary"/>
                                        }
                                        label="Others"
                                    />
                                </form>
                            </div>
                        </div>
                    </Menu>
                </div>
            
            </div>
        )
    }
}

export default MapMenu;