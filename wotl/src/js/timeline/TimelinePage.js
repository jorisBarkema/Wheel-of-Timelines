import React from 'react';
//import Button from '@material-ui/core/Button';

import Timeline from './Timeline.js';
import MainMenu from '../MainMenu.js';
import TimelineBookFilters from './TimelineBookFilters.js';
import TimelineCharacterFilters from './TimelineCharacterFilters.js';
import TimelineSettings from './TimelineSettings.js';
import TimelineNavigator from './TimelineNavigator.js';

import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

import {events as events_data} from '../../data/events.json';

//var timeline_events = events;

var images = require.context('../../assets', true);

class TimelinePage extends React.Component {
    constructor(props) {
        super(props);

        this.scrollHandler = this.handleScroll.bind(this);
        this.navigator = React.createRef();

        this.state = {
            bookFilterChecks: [true, false, false, false, false, false, false, false, false, false, false, false, false, false],
            characterFilterChecksOne: {
                "Rand": true,
                "Perrin": true,
                "Mat": true,
                "Egwene": true,
                "Nynaeve": true,
                "Moiraine": true,
                "Lan": true,
                "Thom": true,
                "Others": true
            },
            characterFilterChecksTwo: {
                "Rand": true,
                "Perrin": true,
                "Mat": true,
                "Egwene": true,
                "Nynaeve": true,
                "Moiraine": true,
                "Lan": true,
                "Thom": true,
                "Others": true
            },
            handleFilterChange: this.handleFilterChange.bind(this),
            bookSelectionOpen: false,
            characterSelectionOpen: false,
            timelineSettingsOpen: false,
            inUniverseDates: false,
            showMinorEvents: false,
            showTwoTimelines: false,
            timeline_events: [],
            activeBook: 1,
            showingNavigator: false
        };
    }

    render = () => {

        return (
            <div>
            <MainMenu />
            <div className="outer-container">

                <div className="row">
                    <div className="col-xs-0 col-md-2 side"></div>
                    <div id="timeline-container" className="col-xs-12 col-md-8 content" style={{paddingBottom: "0px"}}>

                        <div id="title-container">
                            <img src={images('./banner-timeline.png')} alt="Wheel of Timelines banner" />
                        </div>

                        <div className="inner-content">
                            <div id="welcome-text">
                                <p>
                                    Welcome to the Wheel of Timelines timeline! In the menus you can filter the timeline per book to avoid spoilers,
                                    and per person involved for the eight main characters from the start of the series. <br /> 
                                    <br />
                                    If you want to compare the journeys of two (or more) characters, you can split the timeline to show the timeline for two selections of people.
                                    If you like this website, please support it via <a href="https://www.patreon.com/wheeloftimelines"><img className="inline-img" src={images('./patreon-logo.png')} alt="Patreon" />Patreon</a>,
                                    it really makes a difference!<br />
                                    <br />
                                    <b>Note:</b> not all events in the books happen chronologically, so especially in the later books some events of a book may happen before the timeline says that book begins, or after the next book has already begun.
                                    To prevent spoilers, be careful with the book selection before continuing.

                                </p>
                            </div>
                            <div id="timeline-settings-menu">

                                <Button
                                    id="bookSelectionButton"
                                    onClick={() => this.setState({bookSelectionOpen: !this.state.bookSelectionOpen})}
                                    aria-controls="books-collapse"
                                    aria-expanded={this.state.bookSelectionOpen}
                                >
                                    <img className="inline-img" src={images('./icons8-book-stack-52.png')} alt="Books"/> Book Selection
                                </Button>
                                <Collapse in={this.state.bookSelectionOpen}>
                                    <div id="books-collapse">
                                        <TimelineBookFilters 
                                            filterChecks = {this.state.bookFilterChecks}
                                            onFilterChange={(v) => this.state.handleFilterChange(v, "books")}
                                            onShowAll={() => this.handleShowAllBooks()}
                                        />
                                    </div>
                                </Collapse>

                                <Button
                                    id="characterSelectionButton"
                                    onClick={() => this.setState({characterSelectionOpen: !this.state.characterSelectionOpen})}
                                    aria-controls="characters-collapse"
                                    aria-expanded={this.state.characterSelectionOpen}
                                >
                                    <img className="inline-img" src={images('./icons8-person-48.png')} alt="Characters"/> Character Selection
                                </Button>
                                <Collapse in={this.state.characterSelectionOpen}>
                                    <div id="characters-collapse">
                                        {this.state.showTwoTimelines ? <p>First timeline characters</p> : null}
                                        <TimelineCharacterFilters 
                                            onFilterChange={(v) => this.state.handleFilterChange(v, "characters1")}
                                        />
                                        {
                                            this.state.showTwoTimelines ? 
                                            <div>
                                                <p>Second timeline characters</p>
                                                <TimelineCharacterFilters 
                                                    onFilterChange={(v) => this.state.handleFilterChange(v, "characters2")}
                                                />
                                            </div> : null
                                        }
                                    </div>
                                </Collapse>
                               

                                <Button
                                    id="timelineSettingsButton"
                                    onClick={() => this.setState({timelineSettingsOpen: !this.state.timelineSettingsOpen})}
                                    aria-controls="timeline-collapse"
                                    aria-expanded={this.state.timelineSettingsOpen}
                                >
                                    <img className="inline-img" src={images('./icons8-timeline-52.png')} alt="Timeline Settings"/> Timeline Settings
                                </Button>
                                <Collapse in={this.state.timelineSettingsOpen}>
                                    <div id="timeline-collapse">
                                        <TimelineSettings
                                            inUniverseDates={this.state.inUniverseDates}
                                            showMinorEvents={this.state.showMinorEvents}
                                            showTwoTimelines={this.state.showTwoTimelines}

                                            handleDatesChange={() => this.setState({
                                                inUniverseDates: !this.state.inUniverseDates
                                            })}
                                            handleMinorEventsChange={() => this.setState({
                                                showMinorEvents: !this.state.showMinorEvents
                                            }, () => this.setState({timeline_events: this.filterEvents(null, "")}))}
                                            handleTwoTimelinesChange={() => this.setState({
                                                showTwoTimelines: !this.state.showTwoTimelines
                                            }, () => this.setState({timeline_events: this.filterEvents(null, "")}))}
                                        />
                                    </div>
                                </Collapse>
                            </div>
                        
                            <Timeline double={this.state.showTwoTimelines} events={this.state.timeline_events} inUniverseDates={this.state.inUniverseDates}/>                          
                                
                            <div id="more-button-container">
                                <Button
                                    id="showMoreButton"
                                    onClick={() => this.showNextInvisibleBook()}
                                    disabled={!(this.finalVisibleBook() < 13)}
                                >
                                    <img className="inline-img" src={images('./icons8-down-button-64.png')} alt="More"/> Show More
                                </Button>
                            </div>
                            
                        </div>

                        {this.state.showingNavigator ? <TimelineNavigator currentBook={1} ref={this.navigator}/> : null}

                    </div>
                    <div className="col-xs-0 col-md-2 side"></div>
                </div>
            </div>
        </div>
        )
    }

    componentDidMount = () => {

        window.addEventListener('scroll', this.scrollHandler);
        window.addEventListener('touchmove', this.scrollHandler);

        window.scrollTo({
            top: 0    
        })

        this.setState({
            timeline_events: this.filterEvents(null, "")
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.scrollHandler);
        window.removeEventListener('touchmove', this.scrollHandler);
    }

    filterEvents = (checks, changeType) => {

        let bookChecks = this.state.bookFilterChecks;
        let characterChecksOne = this.state.characterFilterChecksOne;
        let characterChecksTwo = this.state.characterFilterChecksTwo;
        let double = this.state.showTwoTimelines;
        let minor = this.state.showMinorEvents;

        if (changeType === "books") {
            bookChecks = checks;
        }
        if (changeType === "characters1") {
            characterChecksOne = checks;
        }
        if (changeType === "characters2") {
            characterChecksTwo = checks;
        }

        let result = events_data.map(function(val){ 
            if (bookChecks[parseInt(val.book) - 1]) {
                return val;
            }
            else {
                return null;
            }
        }).filter(function(val) {
            return (val !== null)
        })

        result = result.map(function(val) {

            let included = false;
            val.timeline_one = false;
            val.timeline_two = false;

            if (val.type === "meta") {
                return val;
            }

            if (val.type === "minor" && !minor) {
                return null
            }
            
            if (!val.hasOwnProperty("people")) {
                console.log(val + " has no property 'people'");
                return null
            }

            if (val.people.length === 0 && characterChecksOne["Others"]) {
                included = true;
                val.timeline_one = true;
            }

            for(let i = 0; i < val.people.length; i++) {
                if (characterChecksOne[val.people[i]]) {
                    included = true;
                    val.timeline_one = true;
                }
            }

            if (double && val.people.length === 0 && characterChecksTwo["Others"]) {
                included = true;
                val.timeline_two = true;
            }

            for(let i = 0; i < val.people.length; i++) {
                if (double && characterChecksTwo[val.people[i]]) {
                    included = true;
                    val.timeline_two = true;
                }
            }

            if (included) {
                return val;
            }
            return null;

        }).filter(function(val) {
            return (val !== null)
        })
        
        //console.log("result after character filter");
        //console.log(result);

        return result;
    }

    repositionNavigator = () => {
        
        let navigator =  document.getElementById("timeline-navigator-container");

        if (navigator !== null) {
            navigator.style.marginLeft = window.scrollX + "px";

        }
    }

    handleScroll = (e) => {

        this.repositionNavigator();
        
        let tableOffsetTop = document.getElementById("timeline-table").offsetTop;
        let tableBodyOffsetTop = document.getElementById("timeline-table-body").offsetTop;
        
        let newShowingNavigator = window.scrollY >= tableOffsetTop + tableBodyOffsetTop;

        let activeBook = this.state.activeBook;

        for(let i = 1; i < 15; i++) {
            let el = document.getElementById("book-" + i);

            if (el !== null) {
                //console.log("book: " + i);
                //console.log("offset top: " + el.offsetTop);

                let t = el.offsetTop + tableOffsetTop;

                if (window.scrollY + ((window.innerHeight - 200) / 2) >= t) {
                    activeBook = i;
                }
            }
        }

        //console.log("active book: " + activeBook);

        if (newShowingNavigator !== this.state.showingNavigator || activeBook !== this.state.activeBook) {
            this.setState({
                showingNavigator: newShowingNavigator,
                activeBook: activeBook
            })
        }

        if (this.navigator.current !== null) this.navigator.current.changeCurrentBook(activeBook);
    }

    handleFilterChange = (v, type) => {

        let newChecks = null;

        if (type === "books") {
            newChecks = this.state.bookFilterChecks;
        }
        if (type === "characters1") {
            newChecks = this.state.characterFilterChecksOne;
        }
        if (type === "characters2") {
            newChecks = this.state.characterFilterChecksTwo;
        }

        newChecks[v] = !newChecks[v];

        this.setState({
            timeline_events: this.filterEvents(newChecks, type)
        });

        if (type === "books") {
            this.setState({
                bookFilterChecks: newChecks,
            })
        }
        if (type === "characters1") {
            this.setState({
                characterFilterChecksOne: newChecks,
            })
        }
        if (type === "characters2") {
            this.setState({
                characterFilterChecksTwo: newChecks,
            })
        }
    }

    handleShowAllBooks = () => {

        let newChecks = [true, true, true, true, true, true, true, true, true, true, true, true, true, true];

        this.setState({
            timeline_events: this.filterEvents(newChecks, "books"),
            bookFilterChecks: newChecks
        })
    }

    finalVisibleBook = () => {
        for(let i = this.state.bookFilterChecks.length - 1; i >= 0 ; i--) {
            if (this.state.bookFilterChecks[i]) {
                return i;
            }
        }

        return -1;
    }

    showNextInvisibleBook = () => {
        
        let f = this.finalVisibleBook();

        if (f < 13) {
            let newChecks = this.state.bookFilterChecks;
            newChecks[f + 1] = true;

            this.setState({
                timeline_events: this.filterEvents(newChecks, "books"),
                bookFilterChecks: newChecks,
            })
        }
    }
}

export default TimelinePage;