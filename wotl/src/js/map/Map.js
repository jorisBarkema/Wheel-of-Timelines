import React from 'react';
import ReactGA from 'react-ga';
import { Stage, Layer, Circle, Path} from 'react-konva';
import {Helmet} from 'react-helmet'
import {isMobile} from 'react-device-detect';

import Cookies from 'universal-cookie';

import Close from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Alert } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';

import MapMenu from './MapMenu.js'
import EventContainer from './EventContainer.js';
import LocationContainer from './LocationContainer.js';
import RegionContainer from './RegionContainer.js';
import Instructions from './Instructions.js';

import CustomImage from './CustomImage.js';

//import PortraitManager from './PortraitManager.js';

import {events} from '../../data/events.json';
import {locations} from '../../data/locations.json';
import {regions} from '../../data/regions.json';
import {stedding} from '../../data/stedding.json';

const cookies = new Cookies();

var images = require.context('../../assets', true);
var mapTilesDirectory = require.context('../../assets/zoomify-map', true);

//const { pointInSvgPath } = require('point-in-svg-path');

/*
var filtered_events = events.filter(function(val) {
    return (val.type === "major")
});
*/

class Map extends React.Component {

    constructor(props) {
        super(props);
        
        this.mounted = false;
        
        //this.ld_image = images("./Map-LD.jpg");
        //this.map_image = this.hd_image;

        this.renderDistance = 300;

        this.image_width = 14800;
        this.image_height = 8000;

        this.steddingOffsetX = 58;
        this.steddingOffsetY = 53;
        this.mountainSteddingOffsetX = 78;
        this.mountainSteddingOffsetY = 67;
        this.portalStoneOffsetX = 0;
        this.portalStoneOffsetY = 0;

        let useCookies = cookies.get('useCookies') === 'true';

        this.state = {
            map_image: isMobile ? this.ld_image : this.hd_image,
            currentMapTiles: [],
            currentMapRowsAndColumns: null,
            currentZoomLevel: 0,
            mapHeight: window.innerHeight,
            minscale: Math.max(window.innerWidth / this.image_width, window.innerHeight / this.image_height),
            maxscale: 2,
            dragging: false,
            pinching: false,
            pinchDistance: 0,
            eventNumber: 0,
            mouseOverTimeline: false,
            mouseOverMenu: false,
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
            showText: (useCookies && cookies.get('showText') !== undefined) ? cookies.get('showText') === 'true' : true,
            showStedding: (useCookies && cookies.get('showStedding') !== undefined) ? cookies.get('showStedding') === 'true' : false,
            showPortalStones: (useCookies && cookies.get('showPortalStones') !== undefined) ? cookies.get('showPortalStones') === 'true' : false,
            showingLines: (useCookies && cookies.get('showingLines') !== undefined) ? cookies.get('showingLines') === 'true' : true,
            showingTimeline: (useCookies && cookies.get('showingTimeline') !== undefined) ? cookies.get('showingTimeline') === 'true' : true,
            showingBorders: (useCookies && cookies.get('showingBorders') !== undefined) ? cookies.get('showingBorders') === 'true' : false,
            inUniverseDates: (useCookies && cookies.get('inUniverseDates') !== undefined) ? cookies.get('inUniverseDates') === 'true' : false,
            filtered_events: events.filter(function(val) {
                return (val.type === "major")
            }),
            handleBookFilterChange: this.handleBookFilterChange.bind(this),
            handleCharacterFilterChange: this.handleCharacterFilterChange.bind(this),
            showingPortraits: false,
            showingLocation: false,
            showingRegion: false,
            locationName: "",
            regionName: "",
            answeredCookies: cookies.get('answeredCookies') === 'true',
            useCookies: useCookies
        };

        this.stage = React.createRef();
        this.mapLayer = React.createRef();
    }

    render = () => {

        let arrow_left = images("./icons8-arrow-left-64.png").default;
        let arrow_right = images("./icons8-arrow-right-64.png").default;

        // Volledige map in 1 image
        //<URLImage onImageLoaded={() => this.onMapLoaded()} listening={false} enablePerfectDrawing={false} src={this.state.map_image}/>

        return (
            <div id="map-main">
                <div id="cookie-popup-container" style={{left: '10%', width: '80%', top: '5px', position: 'fixed', zIndex: 1000}}>
                    <Collapse in={!this.state.answeredCookies}>
                        <Alert 
                            severity="info"
                            action={
                                <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    this.setState({
                                        answeredCookies: true,
                                        useCookies: false
                                    })

                                    cookies.set('answeredCookies', true, { path: '/' });
                                    cookies.set('useCookies', false, { path: '/' });
                                }}
                                >
                                    <Close fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            Accept cookies to save your settings &amp; filters?
                            <br />
                            <Button variant="outlined" color="primary" size="small"
                                onClick={() => {
                                    this.setState({
                                        answeredCookies: true,
                                        useCookies: true
                                    })

                                    cookies.set('answeredCookies', true, { path: '/' });
                                    cookies.set('useCookies', true, { path: '/' });
                                }}
                            >
                                Accept
                            </Button>
                        </Alert>
                    </Collapse>
                </div>
                <Helmet>
                    <title>{"Wheel of Timelines - Map"}</title>
                    <meta name="description" content={"Wheel of Timelines - The biggest Wheel of time map of the westlands, blight and the waste with timeline and character routes"} />
                </Helmet>

                <div id="menu-container"
                    onMouseOver={() => this.setState({mouseOverMenu: true})}
                    onMouseLeave={() => this.setState({mouseOverMenu: false})}>
                    <MapMenu 
                        skipToEnd={() => this.skipToEnd()}
                        onTimelineChange={(v) => this.handleTimelineChange()}
                        onBookFilterChange={(v) => this.state.handleBookFilterChange(v)} 
                        onCharacterFilterChange={(v) => this.state.handleCharacterFilterChange(v)} 
                        onLineChange = {() => this.handleLineChange()}
                        onBordersChange = {() => this.handleNationBordersChange()}
                        onDatesChange = {() => this.handleDatesChange()}
                        showText = {this.state.showText}
                        onShowTextChange = {() => this.handleShowTextChange()}
                        showStedding = {this.state.showStedding}
                        onShowSteddingChange = {() => this.handleShowSteddingChange()}
                        showPortalStones = {this.state.showPortalStones}
                        onShowPortalStonesChange = {() => this.handleShowPortalStonesChange()}
                        hd = {!isMobile}
                        onDefinitionChange = {() => this.setState({map_image: (this.state.map_image === this.ld_image) ? this.hd_image : this.ld_image})} />
                </div>
                
                <div id="map-container" style={{cursor: this.state.dragging ? "grabbing" : "grab"}}>
                    <Stage width={window.innerWidth} 
                        height={window.innerHeight}
                        scaleX={0.7}
                        scaleY={0.7} 
                        draggable={true}
                        ref={ref => (this.stage = ref)}>
                        <Layer ref={ref => (this.mapLayer = ref)} listening={false}>
                            {
                                this.state.currentMapTiles.map((tile) => {
                                    if (tile.props.zoomLevel === this.state.currentZoomLevel) return tile;
                                    return null
                                })
                            }
                        </Layer>
                        
                        {
                            this.state.showStedding ? (
                                <Layer listening={false}>
                                    {
                                        Object.keys(stedding).map((key, index) => {
                                            return this.steddingToImage(stedding[key].x, stedding[key].y, stedding[key].type, index);
                                        })
                                    }
                                </Layer>
                            ) : null
                        }
                        
                        <Layer listening={false}>
                            {
                                this.state.showingBorders ? 
                                (
                                    Object.keys(regions).map((key, index) => {
                                        if (regions[key].nation) return this.borderToPath(regions[key].border, regions[key].borderColor, regions[key].fillColor, index);
                                        return null
                                    })
                                ) : null
                                
                            }
                            
                            {
                                (this.state.showingRegion && (!this.state.showingBorders || !regions[this.state.regionName].nation)) ? this.borderToPath(regions[this.state.regionName].border, regions[this.state.regionName].borderColor, regions[this.state.regionName].fillColor) : null
                            }
                            
                            {
                                this.mounted ? 
                                this.state.filtered_events.map((event) => {
                                    if (!event.hasOwnProperty("paths") || event.paths === []) return null;

                                    return event.paths.map((path, index) => {
                                        //console.log("returning path with svg: " + path.route);
                                        if (!path.visible) return null
                                        return this.eventPathToKonvaPath(path, index);
                                    })
                                }): null
                            } 
                            {
                                this.mounted ? 
                                this.state.filtered_events.map((event) => {
                                    if (!event.hasOwnProperty("paths") || event.paths === []) return null;

                                    return event.paths.map((path, index) => {
                                        //console.log("returning path with svg: " + path.route);
                                        if (!path.visible) return null
                                        return this.eventPathToKonvaCircle(path, index);
                                    })
                                }): null
                            } 
                            
                            {(this.state.filtered_events.length > 0 && this.state.showingTimeline && !this.state.showingRegion && !this.state.showingLocation) ? <Circle listening={false} enablePerfectDrawing={false}  radius={locations[this.state.filtered_events[this.state.eventNumber].location].radius} x={locations[this.state.filtered_events[this.state.eventNumber].location].x} y={locations[this.state.filtered_events[this.state.eventNumber].location].y} 
                                fillRadialGradientStartPoint={{
                                    x: 0,
                                    y: 0
                                }}
                                fillRadialGradientStartRadius={1}
                                fillRadialGradientEndPoint={{
                                    x: 0,
                                    y: 0
                                }}
                                fillRadialGradientEndRadius={locations[this.state.filtered_events[this.state.eventNumber].location].radius}
                                fillRadialGradientColorStops={[0, "#fff0", 0.2, "#fff0", 0.3, "#f00B", 1, "#f000"]}/> : null
                            }
                        </Layer>
                    </Stage>
                </div>
                {
                    (this.state.filtered_events.length > 0 && this.state.showingTimeline && !this.state.showingLocation) ? 
                    <div id="timeline" className="row map-info" 
                        onMouseOver={() => this.setState({mouseOverTimeline: true})}
                        onMouseLeave={() => this.setState({mouseOverTimeline: false})}>
                    
                        {
                            this.state.eventNumber > 0 ? 
                            <EventContainer event={this.state.filtered_events[this.state.eventNumber - 1]} opacity={0.5} pos="side" inUniverseDates={this.state.inUniverseDates} /> : 
                            <Instructions />
                        }

                        {
                            this.state.eventNumber > 0 ?
                            <div className="col-2 col-sm-1 event-switcher unselectable" onClick={() => this.switchEvent("left")}>
                                <img src={arrow_left} alt="Previous event" opacity={this.state.eventNumber > 1 ? 1 : 0.5} />
                            </div> : <div className="col-1"></div>
                        }
                        <EventContainer event={this.state.filtered_events[this.state.eventNumber]} opacity={1} pos="center" inUniverseDates={this.state.inUniverseDates} />
                        
                        {
                            (this.state.eventNumber + 1) < this.state.filtered_events.length ?
                            <div className="col-2 col-sm-1 event-switcher unselectable" onClick={() => this.switchEvent("right")}>
                                <img src={arrow_right} alt="Next event" opacity={this.state.eventNumber < events.length - 1 ? 1 : 0.5} />
                            </div> : <div className="col-1"></div>
                        }
                        {
                            (this.state.eventNumber + 1) < this.state.filtered_events.length ? 
                            <EventContainer event={this.state.filtered_events[this.state.eventNumber + 1]} opacity={0.5} pos="side" inUniverseDates={this.state.inUniverseDates} /> : 
                            <div className="d-none d-sm-block col-sm-3 event-container"></div>
                        }
                    </div> : 
                    null
                }
                {
                    this.state.showingLocation ?
                    (
                        <div
                            onMouseOver={() => this.setState({mouseOverTimeline: true})}
                            onMouseLeave={() => this.setState({mouseOverTimeline: false})}
                        >
                            <LocationContainer 
                                events={this.state.filtered_events.map((event, index) => {
                                            return (event.location === this.state.locationName ? {event: event, number: index} : null);
                                            }).filter(function (el) {
                                                return el != null;
                                            })
                                        }
                                name={this.state.locationName} 
                                onShowingLocationChange={() => this.onShowingLocationChange()}
                                goToEvent={(nr) => this.goToEvent(nr)}
                            />
                        </div>
                    ) : null
                }
                {
                    this.state.showingRegion ?
                    (
                        <div
                            onMouseOver={() => this.setState({mouseOverTimeline: true})}
                            onMouseLeave={() => this.setState({mouseOverTimeline: false})}
                        >
                            <RegionContainer
                                name={this.state.regionName} 
                                onShowingRegionChange={() => this.onShowingRegionChange()}
                            />
                        </div>
                    ) : null
                }
                    
            </div>
        )
    }

    componentDidMount = () => {

        document.getElementById("map-container").addEventListener('click', this.handleMapClick);

        window.addEventListener('wheel', this.zoomMap, {passive: true});
        window.addEventListener('resize', this.onResize);

        document.getElementById("map-container").addEventListener('touchstart', this.handleTouchStart);
        document.getElementById("map-container").addEventListener('touchmove', this.handleTouchMove);
        document.getElementById("map-container").addEventListener('touchend', this.handleTouchEnd);
        document.getElementById("map-container").addEventListener('touchleave', this.handleTouchEnd);
        document.getElementById("map-container").addEventListener('touchcancel', this.handleTouchEnd, {passive: true});

        // Ik weet niet meer waarom dit er stond?
        //this.state.handleBookFilterChange();

        this.mounted = true;

        this.mapLookAt(locations["al'Thor Farm"].x, locations["al'Thor Farm"].y);
        //this.mapLookAt(locations["Amador"].x, locations["Amador"].y);

        this.stage.on('dragmove', this.onMoveMap);

        this.stage.on('dragstart', () => {
            this.setState({
                dragging: true
            });
        });

        this.stage.on('dragend', () => {
            this.setState({
                dragging: false
            });
        });

        this.getCurrentMapTiles();

        let offsetHeight = document.getElementById("timeline") === null ? 0 : document.getElementById("timeline").offsetHeight; 

        this.setState({
            mapHeight: window.innerHeight - offsetHeight
        });

        this.filterEvents(this.state.bookFilterChecks, this.state.characterFilterChecks);
    }

    getCurrentMapTiles = () => {
        //console.log("getting current map tiles");

        let scale = this.stage.scaleX();

        let zoomLevel = this.getZoomLevelByScale(scale);

        let tilescale = 1 << (6 - zoomLevel);

        let rowsAndColumns = this.getRowsAndColumns();

        let tiles = [];

        rowsAndColumns.rows.map((row) => {
            rowsAndColumns.columns.map((column) => {
                let textString = this.state.showText ? "text": "notext";

                let path = textString + "/" + zoomLevel + "-" + column + "-" + row + ".jpg";

                require.resolveWeak("../../assets/zoomify-map/" + path);

                tiles.push(<CustomImage
                    key={path}
                    zoomLevel={zoomLevel}
                    scaleX={tilescale} scaleY={tilescale} 
                    x={256 * tilescale * column} y={256 * tilescale * row}
                    listening={false} enablePerfectDrawing={false} src={mapTilesDirectory('./' + path).default}
                />);
                
                return null;
            })

            return null;
        })
        
        let oldTiles = this.state.currentMapTiles;

        for(let i = 0; i < tiles.length; i++) {
            if (!this.tileArrayContainsTile(oldTiles, tiles[i])) oldTiles.push(tiles[i]);
        }

        this.setState({
            currentZoomLevel: zoomLevel,
            currentMapTiles: oldTiles,
            currentMapRowsAndColumns: rowsAndColumns,
        })
    }

    tileArrayContainsTile = (array, tile) => {
        for(let i = 0; i < array.length; i++) {
            if (array[i].key === tile.key) return true;
        }

        return false;
    }

    checkGetCurrentMapTiles = () => {
        let newRowsAndColumns = this.getRowsAndColumns();

        if (!(JSON.stringify(newRowsAndColumns) === JSON.stringify(this.state.currentMapRowsAndColumns))) {
            this.getCurrentMapTiles();
        }
    }

    getRowsAndColumns = () => {

        let scale = this.stage.scaleX();

        let zoomLevel = this.getZoomLevelByScale(scale);

        let tilescale = 1 << (6 - zoomLevel);

        let tileSize = tilescale * 256;

        // Do it some distance out of bounds so they load before they are needed
        let topLeft = this.getMapPosition(-this.renderDistance, -this.renderDistance);
        let bottomRight = this.getMapPosition(window.innerWidth + this.renderDistance, window.innerHeight + this.renderDistance);


        // The map is 14.800 x 8000
        // So there are 14.800 / tileSize columns
        // And 8000 / tileSize rows
        // Both rounded up, but since 0 is included we can round it down

        let rowStart = Math.max(0, Math.floor(topLeft[1] / tileSize));
        let columnStart = Math.max(0, Math.floor(topLeft[0] / tileSize));

        let rowEnd = Math.min(Math.floor(8000 / tileSize), Math.ceil(bottomRight[1] / tileSize));
        let columnEnd = Math.min(Math.floor(14800 / tileSize), Math.ceil(bottomRight[0] / tileSize));

        let rows = [];
        for (let i = rowStart; i <= rowEnd; i++) {
            rows.push(i);
        }

        let columns = [];
        for (let i = columnStart; i <= columnEnd; i++) {
            columns.push(i);
        }

        return {rows: rows, columns: columns}
    }

    getZoomLevelByScale = (scale) => {
        if (scale > 0.6) return 6;
        if (scale > 0.4) return 5;
        else {
            return 4;
        }
    }

    steddingToImage = (x, y, type, key) => {

        let image = type === "mountain" ?  mapTilesDirectory('./mountain_stedding.png').default : mapTilesDirectory('./stedding.png').default;
        let ox = type === "mountain" ? this.mountainSteddingOffsetX : this.steddingOffsetX;
        let oy = type === "mountain" ? this.mountainSteddingOffsetY : this.steddingOffsetY;
        
        return (<CustomImage
            key={key} 
            x={x - ox} y={y - oy}
            listening={false} enablePerfectDrawing={false} src={image}
        />)
    }

    onResize = () => {

        let newminscale = Math.max(window.innerWidth / this.image_width,  this.state.mapHeight / this.image_height);

        this.setState({
            minscale: newminscale,
        })
    }

    handleTouchStart = (e) => {

        e.preventDefault();

        if (e.touches.length === 1) {
            
            let pos = this.stage.absolutePosition();

            let mx = (-pos.x + e.touches[0].pageX) / this.stage.scaleX();
            let my = (-pos.y + e.touches[0].pageY) / this.stage.scaleY(); 

            this.handleShowingLocationOrRegion(mx, my);
        }
        
        if (e.touches.length === 2) {

            let d = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

            this.setState({
                pinching: true,
                //dragging: false,
                pinchDistance: d
            })
        }
        
    }

    handleTouchMove = (e) => {

        e.preventDefault();

        if (this.state.pinching) {
            let d = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

            let factor = d / (this.state.pinchDistance === 0 ? d : this.state.pinchDistance);
            let centerx = e.touches[0].pageX + (e.touches[1].pageX - e.touches[0].pageX) / 2;
            let centery = e.touches[0].pageY + (e.touches[1].pageY - e.touches[0].pageY) / 2;

            this.zoomMapTo(centerx, centery, this.stage.scaleX() * factor);

            this.setState({
                pinchDistance: d
            })
        }
    }

    handleTouchEnd = (e) => {

        e.preventDefault();
        
        this.setState({
            //dragging: false,
            pinching: false
        })
    }

    handleMapClick = (e) => {

        //console.log("handling map click");
        let pos = this.stage.absolutePosition();

        let mx = (-pos.x + e.pageX) / this.stage.scaleX();
        let my = (-pos.y + e.pageY) / this.stage.scaleY(); 

        console.log("map x: " + Math.round(mx) + ", map y: " + Math.round(my));

        this.handleShowingLocationOrRegion(mx, my);
    }

    handleShowingLocationOrRegion = (x, y) => {
        let name = this.getLocationName(x, y)
        
        if (name !== "") {
            this.startShowingLocation(name);
            this.setState({
                showingRegion: false
            })
        }

        let region = this.getRegionName(x, y);

        if (region !== "") {
            console.log("start showing region " + region);
            this.startShowingRegion(region);
            this.setState({
                showingLocation: false
            })
        }
       
    }

    startShowingLocation = (name) => {
        this.setState({
            showingLocation: true,
            locationName: name
        })
    }

    getLocationName = (x, y) => {
        
        let name = "";

        for(var key in locations){
            if (Math.abs(locations[key].x - x) < locations[key].radius / 4 && Math.abs(locations[key].y - y) < locations[key].radius / 4) {
                if (!locations[key].hasOwnProperty("hidden") || locations[key].hidden === false) name = key;
            }
        }

        return name
    }

    startShowingRegion = (name) => {
        this.setState({
            showingRegion: true,
            regionName: name
        })
    }

    getRegionName = (x, y) => {
        let region = "";

        for(var key in regions){
            if (x >= regions[key].hitbox[0] && x <= regions[key].hitbox[2] &&
                y >= regions[key].hitbox[1] && y <= regions[key].hitbox[3]) {
                    region = key;
                }
        }

        return region
    }

    onMoveMap = () => {
        this.boundMap();

        this.checkGetCurrentMapTiles();
    }

    getStageCoordinatesFromLocation = (x, y) => {
        
        let pos = this.stage.absolutePosition();
        let centerPosition = this.getMapPosition(window.innerWidth / 2, this.state.mapHeight / 2);

        let nx = pos.x + (centerPosition[0] - x) * this.stage.scaleX();
        let ny = pos.y + (centerPosition[1] - y) * this.stage.scaleY();

        return {x: nx, y: ny}
    }

    mapLookAt = (x, y) => {
        let coords = this.getStageCoordinatesFromLocation(x, y);

        this.stage.absolutePosition(coords);

        this.checkGetCurrentMapTiles();
    }

    animateMapLookAt = (x, y) => {
        let coords = this.getStageCoordinatesFromLocation(x, y);

        this.stage.to({
            x: coords.x,
            y: coords.y,
            duration: 0.5,
            onFinish: () => {
                this.checkGetCurrentMapTiles();
            }
        });
    }

    zoomMap = (e) => {
        if (this.state.mouseOverMenu || this.state.mouseOverTimeline) return;
        if (this.stage === null) return;
        
        // Misschien dit omkeren (< naar > en > naar <) als het op mobiel beter is omgekeerd
        // maar zo vind ik het intuitiever met scrollen
        let factor = 1;
        let scaling = 0.2;

        if (e.deltaY < 0) factor += scaling;
        if (e.deltaY > 0) factor -= scaling;

        let newscale = this.stage.scaleX() * factor;

        this.zoomMapTo(e.pageX, e.pageY, newscale);
    }

    zoomMapTo = (x, y, newscale) => {
        if (newscale > this.state.maxscale) newscale = this.state.maxscale;
        if (newscale < this.state.minscale) newscale = this.state.minscale;

        if (this.stage === null) return;

        let oldscale = this.stage.scaleX();

        let pos = this.stage.absolutePosition();

        let newPositions = this.boundPositionValues(x - (x - pos.x) * newscale / oldscale, y - (y - pos.y) * newscale / oldscale, newscale);

        this.stage.to({
            scaleX: newscale,
            scaleY: newscale,
            x: newPositions[0],
            y: newPositions[1],
            duration: 0.1,
            onFinish: () => {
                this.boundMap();
                this.checkGetCurrentMapTiles();
            }
        });
    }

    boundPositionValues = (x, y, scale = null) => {

        if (scale === null) scale = this.stage.scaleX();

        if (x >= 0) x = 0;
        if (y >= 0) y = 0;

        let rightborder = window.innerWidth - this.image_width * scale;
        let bottomborder =  this.state.mapHeight -  this.image_height * scale;

        if (x < rightborder) x = rightborder;
        if (y < bottomborder) y = bottomborder;

        return [x, y]
    }

    boundMap = () => {
        let pos = this.stage.absolutePosition();

        if (pos.x >= 0) pos.x = 0;
        if (pos.y >= 0) pos.y = 0;

        let rightborder = window.innerWidth - this.image_width * this.stage.scaleX();
        let bottomborder =  this.state.mapHeight -  this.image_height * this.stage.scaleY();

        if (pos.x < rightborder) pos.x = rightborder;
        if (pos.y < bottomborder) pos.y = bottomborder;

        this.stage.absolutePosition(pos);
    }

    getMapPosition = (x, y) => {

        let s = this.stage.scaleX();
        let pos = this.stage.absolutePosition();
    
        let mx = (x - pos.x) / s;
        let my = (y - pos.y) / s;
        
        return [mx, my]
    }

    skipToEnd = () => {
        this.switchToEvent(this.state.filtered_events.length - 1);
        if (this.state.showingLines) {
            this.showLinesUntil(this.state.filtered_events.length - 1);
        }
    }

    handleShowTextChange = () => {

        if (this.state.useCookies) cookies.set('showText', !this.state.showText, { path: '/' });

        this.setState({
            showText: !this.state.showText,
            currentMapTiles: []
        }, () => {
            this.getCurrentMapTiles();
        })
    }

    handleShowSteddingChange = () => {

        if (this.state.useCookies) cookies.set('showStedding', !this.state.showStedding, { path: '/' });

        this.setState({
            showStedding: !this.state.showStedding
        })
    }

    handleShowPortalStonesChange = () => {

        if (this.state.useCookies) cookies.set('showPortalStones', !this.state.showPortalStones, { path: '/' });

        this.setState({
            showPortalStones: !this.state.showPortalStones
        })
    }

    handleTimelineChange = () => {


        //if (this.state.showingLines) this.hideAllLines();

        //TODO: wat te doen met de lines moeten die nog wel zichtbaar zijn?
        // zo ja, dan gebaseerd op de bookFilterChecks welke wel of niet

        if (this.state.useCookies) cookies.set('showingTimeline', !this.state.showingTimeline, { path: '/' });
        console.log(cookies.get('showingTimeline'));

        this.setState({
            showingTimeline: !this.state.showingTimeline
        })
    }

    onShowingLocationChange = () => {
        this.setState({
            showingLocation: false
        })
    }

    onShowingRegionChange = () => {
        this.setState({
            showingRegion: false
        })
    }

    handleLineChange = () => {

        // If it is true now, it will become false
        if (this.state.showingLines) this.hideAllLines();

        // Else it will become true
        else {
            this.showLinesUntil(this.state.eventNumber);
        }

        if (this.state.useCookies) cookies.set('showingLines', !this.state.showingLines, { path: '/' });
        console.log(cookies.get('showingLines'));

        this.setState({
            showingLines: !this.state.showingLines
        })
    }

    handleNationBordersChange = () => {

        if (this.state.useCookies) cookies.set('showingBorders', !this.state.showingBorders, { path: '/' });
        console.log(cookies.get('showingBorders'));

        this.setState({
            showingBorders: !this.state.showingBorders
        })
    }

    handleDatesChange = () => {

        if (this.state.useCookies) cookies.set('inUniverseDates', !this.state.inUniverseDates, { path: '/' });
        console.log(cookies.get('inUniverseDates'));

        this.setState({
            inUniverseDates: !this.state.inUniverseDates
        })
    }

    handleCharacterFilterChange = (v) => {
        console.log("hadlign character filter change");

        let newChecks = this.state.characterFilterChecks;
        newChecks[v] = !newChecks[v];

        if (this.state.useCookies) cookies.set(v + 'Filter', newChecks[v], { path: '/' });

        this.filterEvents(this.state.bookFilterChecks, newChecks);
    }

    handleBookFilterChange = (v) => {
        let newChecks = this.state.bookFilterChecks;
        newChecks[v] = !newChecks[v];
        
        if (this.state.useCookies) cookies.set('book' + v + 'Filter', newChecks[v], { path: '/' });

        this.filterEvents(newChecks, this.state.characterFilterChecks);
    }

    filterEvents = (bookFilters, characterFilters) => {

        let filtered_events = events.filter(function(val) {
            return (val.type === "major")
        }).map(function(val, index){ 
            if (bookFilters[parseInt(val.book) - 1]) {
                return val;
            }
            else {
                return null;
            }
        }).filter(function(val) {
            return (val !== null)
        }).map(function(val, index) {
            if (val.people.length === 0 && characterFilters["Others"]) {
                return val;
            }

            for(let i = 0; i < val.people.length; i++) {
                if (characterFilters[val.people[i]]) {
                    return val;
                }
            }

            return null;
        }).filter(function(val) {
            return (val !== null)
        })

        this.setState({
            bookFilterChecks: bookFilters,
            characterFilterChecks: characterFilters,
            eventNumber: 0 // Nog beter zou zijn om te kijken of het huidige event er in zit, zo ja daar naar toe zo nee naar 0
        }, () => {

            let tlh = 0;
            if (filtered_events.length !== 0 && this.state.showingTimeline && document.getElementById("timeline") !== null) {
                tlh = document.getElementById("timeline").offsetHeight;
            }
            
            this.setState({
                mapHeight: window.innerHeight - tlh,
                minscale: Math.max(window.innerWidth / this.image_width, (window.innerHeight - tlh) / this.image_height),
            })
        })

        if (filtered_events.length === 0) return;

        if (this.state.showingLines) {
            this.showLinesUntil(0)
        }

        this.mapLookAt(locations[filtered_events[0].location].x, locations[filtered_events[0].location].y);

        this.setState({
            filtered_events: filtered_events
        })
    }

    switchEvent = (direction) => {

        let nn = this.state.eventNumber;

        if (direction === "left" && nn > 0) {
            nn--;
        }

        if (direction === "right" && nn < this.state.filtered_events.length - 1) {
            nn++;
        }

        if (this.state.showingLines) {
            // Going back
            if (nn < this.state.eventNumber) {

                // Going back, the old path needs to be hidden
                if (this.state.filtered_events[this.state.eventNumber].hasOwnProperty("paths")) {
                    this.state.filtered_events[this.state.eventNumber].paths.map((path) => {
                        path.visible = false;
                        return null
                    })
                }
            }

            // Going forward
            else {
                console.log(this.state.filtered_events[nn].paths);
                if (this.state.filtered_events[nn].hasOwnProperty("paths")) {
                    this.state.filtered_events[nn].paths.map((path) => {
                        path.visible = true;
                        return null
                    })
                }
            }
        }
        
        // As of now, this happens before the update has been fully updated, so the result is wrong.
        // However, setting the state in the componentDidUpdate leads to infinite recursion.

        // Result is that the border is always one timeline update behind.
        // Also happens when doing setState with eventNumber first.
        // Oddly, trying the map height portion as callback for the first setstate causes even the first one to break.
        // For now, just give the body the same background as the timeline and it is barely noticable.
        this.switchToEvent(nn);
        
        ReactGA.event({
            category: 'Map',
            action: 'Switched event',
            label: direction
        });
    }

    goToEvent = (number) => {

        this.setState({
            showingLocation: false
        }, () => {
            this.switchToEvent(number);
        });
        
    }

    switchToEvent = (number) => {
        this.setState({
            eventNumber: number
        }, () => {
            let tlh = (document.getElementById("timeline") === null ? 0 : document.getElementById("timeline").offsetHeight);

            this.setState({
                mapHeight: window.innerHeight - tlh,
                minscale: Math.max(window.innerWidth / this.image_width, (window.innerHeight - tlh) / this.image_height)
            })

            this.animateMapLookAt(locations[this.state.filtered_events[number].location].x, locations[this.state.filtered_events[number].location].y);
        })
    }

    hideAllLines = () => {
        this.state.filtered_events.map((event) => {
            if (event.hasOwnProperty("paths")) {
                event.paths.map((path) => {
                    path.visible = false;
                    return null
                })
            }
            return null
        })
    }
    
    showLinesUntil = (n) => {

        for(let i = 0; i < n; i++) {
            if (this.state.filtered_events[i].hasOwnProperty("paths")) {
                this.state.filtered_events[i].paths.map((path) => {
                    path.visible = true;
                    return null
                })
            }
        }
    }
    
    eventPathToKonvaPath = (eventPath, index) => {
        //let pos = this.stage.absolutePosition();

        //console.log(eventPath);
        return <Path
            x={0}
            y={0}
            stroke={this.peopleToColour(eventPath.people)}
            shadowColor= {this.peopleToColour(eventPath.people)}
            shadowBlur = {10}
            strokeWidth={4}
            dash={this.travelStyleToDash(eventPath.style)}
            data={eventPath.route}
            key={index}
        />
    }

    eventPathToKonvaCircle = (eventPath, index) => {

        let split = eventPath.route.split(" ");

        let x = split[split.length - 2];
        let y = split[split.length - 1];

        //console.log("circle x, y: " + x + ", " + y)
        return <Circle
            x={x}
            y={y}
            fill={this.peopleToColour(eventPath.people)}
            strokeWidth={1}
            stroke={"white"}
            shadowEnabled={false}
            radius={3}
            key={index}
        />
    }

    borderToPath = (border, borderColor, fillColor, index) => {

        if (border === undefined || borderColor === undefined || fillColor === undefined) return null;

        return <Path
                    x={0}
                    y={0}
                    stroke={borderColor}
                    shadowColor= {borderColor}
                    shadowBlur = {20}
                    strokeWidth={8}
                    data={border}
                    fill={fillColor}
                    key={index}
               />
    }

    segmentToStartCircle = (segment, index) => {
        return <Circle key={index} radius={2} x={this.state.mapx + locations[segment.start].x} y={this.state.mapy + locations[segment.start].y} fill={this.peopleToColour(segment.people)} />
    }

    travelStyleToDash = (style) => {
        if (style === "ways") return [10, 10];
        if (style === "gateway") return [20, 20];
        if (style === "portalstone") return [5, 5]
        if (style === "tar") return [10, 5, 5, 5];
        return [];
    }

    peopleToColour = (people) => {
        let r = 80, g = 80, b = 80;
        //let r = 148, g = 148, b = 148;

        if (people.includes("Rand") && this.state.characterFilterChecks["Rand"]) r = 255;
        if (people.includes("Perrin") && this.state.characterFilterChecks["Perrin"]) g = 255;
        if (people.includes("Mat") && this.state.characterFilterChecks["Mat"]) b = 255;

        return "rgb(" + r + "," + g + "," + b + ")";
    }
}

export default Map;