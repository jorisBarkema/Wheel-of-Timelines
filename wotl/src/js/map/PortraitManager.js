import React from 'react';
import { FastLayer, Circle} from 'react-konva';
//import Portrait from './Portrait.js';

import portraits from './portraits.json';

//var images = require.context('./assets', true);
var path = require("svg-path-properties");

class PortraitManager extends React.Component{
    constructor(props) {
        super(props);

        console.log(portraits);
        
        this.portraitRadius = 12;
        this.currentEventID = 0;
        this.handledEvents = [];
        this.inProgressEvents = [];
        
        //portraitData = portraitData;
        //this.loadImages();
        //this.rand = null;
        //this.portraits = {};
        




        this.state = {
            mapx: props.mapx,
            mapy: props.mapy
        }

        this.radius = 12;

        //console.log(portraits);
        this.portraits = portraits.portraits;
    }

    render = () => {
        return (
            <FastLayer>
                {
                    Object.keys(this.portraits).map((data, index) => {
                        //console.log(this.state.mapx + this.portraits[data].location.x);
                        return (
                            <Circle 
                                x={this.state.mapx + this.portraits[data].location.x} 
                                y={this.state.mapy + this.portraits[data].location.y} 
                                fill='white' key={index}
                                radius={this.radius}
                            />
                        )
                    })
                }
            </FastLayer>
        )
    }

    handleMapMovement = (x, y) => {
        //console.log("moving reached portraitmanager");
        this.setState({
            mapx: x,
            mapy: y
        })
    }

    appendPathTo = (name, segment) => {
        this.portraits[name].paths.push(segment);
        
        if (!this.portraits[name].moving) {
            this.portraits[name].moving = true;
            //this.startMoving(this.portraits[name]);
        }
    }

    startMoving = (portrait) => {
        
        let currentPath = portrait.paths.shift();

        let t = 0;


        this.inProgressEvents.push(currentPath.event_id);
        //console.log(this.inProgressEvents);

        if (currentPath.people.length > 1) {
            //console.log(currentPath.people.length);
            let radius = 30;
            portrait.offset.x = radius * Math.cos((2 * Math.PI / currentPath.people.length) * currentPath.people.indexOf(portrait.name));
            portrait.offset.y = radius * Math.sin((2 * Math.PI / currentPath.people.length) * currentPath.people.indexOf(portrait.name));

        }
        
        let waitInterval = setInterval(() => {

            if (currentPath.dependencies !== undefined) {
                if (!this.intersects(currentPath.dependencies, this.inProgressEvents)) {
                    clearInterval(waitInterval);
                    this.moveTo(portrait, currentPath, t);
                }
            } else {
                clearInterval(waitInterval);
                    this.moveTo(portrait, currentPath, t);
            }
            
        }, 16)
    }

    animateTo = (portrait, currentPath, t) => {
        
    }

    moveTo = (portrait, currentPath, t) => {
        setTimeout(() => {
           
            this.snapTo(portrait, currentPath.svg, t);
            if (t >= path.svgPathProperties(currentPath.svg).getTotalLength()) {

                this.handledEvents.push(currentPath.event_id);
                //console.log(this.handledEvents);

                this.removeFirst(this.inProgressEvents, currentPath.event_id);
                if (portrait.paths.length > 0) {
                    this.startMoving(portrait);
                } else {
                    portrait.moving = false;
                }
                
            } else {
                this.moveTo(portrait, currentPath, t += this.travelStyleToSpeed(currentPath.style));
            }
        },25)
    }

    snapTo = (portrait, svg, t) => {
        portrait.location = path.svgPathProperties(svg).getPointAtLength(t);
        this.parent.forceUpdate();
    }

    removeFirst = (a, v) => {
        for( var i = 0; i < a.length; i++){ 
            if ( a[i] === v) { 
                a.splice(i, 1); i--;
                return;
            }
        }
    }

    intersects = (x, y) => {

        for (var i = 0; i < x.length; i++) {
            for (var z = 0; z < y.length; z++) {
                if (x[i] === y[z]) {
                    return true;
                }
            }
        }
        return false;
    }

    travelStyleToSpeed = (style) => {
        if (style === "gateway") {
            return 10;
        }
        if (style === "ways") {
            return 7;
        }
        if (style === "tar") {
            return 4;
        }
        if (style === "boat") {
            return 3;
        } else {
            return 2;
        }
    }

















    /*
    portraitToRatio = (portrait) => {
        return Math.max(this.portraitRadius * 2 / portrait.width, this.portraitRadius * 2 / portrait.height)
    }

    loadImages = () => {
        // rand flag source: https://www.reddit.com/r/ImaginaryCharacters/comments/d5j8nh/rand_althor_fanart_of_josha_stradowski_in_the/
        // by corey lansdell makkelijk te zien bij source
        portraitData["Rand"].image = new window.Image();
        portraitData["Rand"].image.onload = () => {
            //alert("image is loaded");
            this.portraits["Rand"] = <Portrait
                key={1} radius={this.portraitRadius} ref="testref"
                x={-2311 + portraitData["Rand"].location.x + portraitData["Rand"].offset.x} 
                y={-1816.3333333333333 + portraitData["Rand"].location.y + portraitData["Rand"].offset.y} 
                image={portraitData["Rand"].image} 
                ratio={this.portraitToRatio(portraitData["Rand"])}
                width={portraitData["Rand"].width} height={portraitData["Rand"].height}
            />;
        }
        portraitData["Rand"].image.src = images('./character-portraits/rand-flag-cropped.png');

        // mat https://wot.fandom.com/wiki/Matrim_Cauthon by John Seamas Gallagher
        portraitData["Mat"].image = new window.Image();
        portraitData["Mat"].image.src = images('./character-portraits/mat2-cropped.png');

        // perrin unknown zelfde als quizzes
        portraitData["Perrin"].image = new window.Image();
        portraitData["Perrin"].image.src = images('./character-portraits/perrin-cropped.png');

        // egwene net als quizzes by John Seamas Gallagher
        portraitData["Egwene"].image = new window.Image();
        portraitData["Egwene"].image.src = images('./character-portraits/egwene-cropped.png');

        // nynaeve net als quizzes
        portraitData["Nynaeve"].image = new window.Image();
        portraitData["Nynaeve"].image.src = images('./character-portraits/nynaeve-cropped.png');

        // moiraine net als quizzes
        portraitData["Moiraine"].image = new window.Image();
        portraitData["Moiraine"].image.src = images('./character-portraits/moiraine-cropped.png');

        // lan net als quizzes
        portraitData["Lan"].image = new window.Image();
        portraitData["Lan"].image.src = images('./character-portraits/lan-cropped.png');

        // thom net als quizzes
        portraitData["Thom"].image = new window.Image();
        portraitData["Thom"].image.src = images('./character-portraits/thom-cropped.png');
    }
    */
    /*
    portraitCircle = (name, key, mapx, mapy) => {
        return (
            <Circle perfectDrawEnabled={false} listening={false} key={key} radius={this.portraitRadius} 
                x={mapx + portraitData[name].location.x + portraitData[name].offset.x} y={mapy + portraitData[name].location.y + portraitData[name].offset.y} 
                fillPatternImage={portraitData[name].image} 
                fillPatternScaleX={this.portraitToRatio(portraitData[name])} fillPatternScaleY={this.portraitToRatio(portraitData[name])}
                fillPatternOffsetX={portraitData[name].width / 2} fillPatternOffsetY={portraitData[name].height / 2}
            />
        )
        
        return (
            <Portrait
                key={key} radius={this.portraitRadius} 
                x={mapx + portraitData[name].location.x + portraitData[name].offset.x} 
                y={mapy + portraitData[name].location.y + portraitData[name].offset.y} 
                image={portraitData[name].image} 
                ratio={this.portraitToRatio(portraitData[name])}
                width={portraitData[name].width} height={portraitData[name].height}
            />
        )
    }

    getPortrait = (name, key, mapx, mapy) => {
        
        return (
            <Circle perfectDrawEnabled={false} listening={false} key={key} radius={this.portraitRadius} 
                x={mapx + portraitData[name].location.x + portraitData[name].offset.x} y={mapy + portraitData[name].location.y + portraitData[name].offset.y} 
                fillPatternImage={portraitData[name].image} 
                fillPatternScaleX={this.portraitToRatio(portraitData[name])} fillPatternScaleY={this.portraitToRatio(portraitData[name])}
                fillPatternOffsetX={portraitData[name].width / 2} fillPatternOffsetY={portraitData[name].height / 2}
            />
        )

        console.log("getting " + name);
        console.log(mapx + ", " + mapy);
        return (
            <Portrait
                key={key} radius={this.portraitRadius} 
                x={mapx + portraitData[name].location.x + portraitData[name].offset.x} 
                y={mapy + portraitData[name].location.y + portraitData[name].offset.y} 
                image={portraitData[name].image} 
                ratio={this.portraitToRatio(portraitData[name])}
                width={portraitData[name].width} height={portraitData[name].height}
            />
        )

        if (name !== "Rand") return null;
    
        this.setLocation(name, mapx, mapy);
        
        return this.portraits[name];

        console.log(mapx);
        console.log(mapy);
        return (
            <Portrait
                radius={this.portraitRadius} 
                x={mapx + portraitData["Rand"].location.x + portraitData["Rand"].offset.x} 
                y={mapy + portraitData["Rand"].location.y + portraitData["Rand"].offset.y} 
                image={portraitData["Rand"].image} 
                ratio={this.portraitToRatio(portraitData["Rand"])}
                width={portraitData["Rand"].width} height={portraitData["Rand"].height}
            />
        )
    }

    setLocation = (name, mapx, mapy) => {
        this.portraits["Rand"] = <Portrait
            key={1} radius={this.portraitRadius} ref="testref"
            x={mapx + portraitData["Rand"].location.x + portraitData["Rand"].offset.x} 
            y={mapy + portraitData["Rand"].location.y + portraitData["Rand"].offset.y} 
            image={portraitData["Rand"].image} 
            ratio={this.portraitToRatio(portraitData["Rand"])}
            width={portraitData["Rand"].width} height={portraitData["Rand"].height}
        />;
    }

    mapCircle = (name, key, mapx, mapy) => {
       console.log(this.newPortraits);
       this.newPortraits[name].setLocation(mapx + portraitData[name].location.x + portraitData[name].offset.x, mapy + portraitData[name].location.y + portraitData[name].offset.y);

    }
    */

    /*
    appendPathTo = (name, segment) => {
        portraitData[name].paths.push(segment);
        
        if (!portraitData[name].moving) {
            portraitData[name].moving = true;
            this.startMoving(portraitData[name]);
        }
    }

    startMoving = (portrait) => {
        
        let currentPath = portrait.paths.shift();

        let t = 0;


        this.inProgressEvents.push(currentPath.event_id);
        //console.log(this.inProgressEvents);

        if (currentPath.people.length > 1) {
            //console.log(currentPath.people.length);
            let radius = 30;
            portrait.offset.x = radius * Math.cos((2 * Math.PI / currentPath.people.length) * currentPath.people.indexOf(portrait.name));
            portrait.offset.y = radius * Math.sin((2 * Math.PI / currentPath.people.length) * currentPath.people.indexOf(portrait.name));

        }
        
        let waitInterval = setInterval(() => {

            if (currentPath.dependencies !== undefined) {
                if (!this.intersects(currentPath.dependencies, this.inProgressEvents)) {
                    clearInterval(waitInterval);
                    this.moveTo(portrait, currentPath, t);
                }
            } else {
                clearInterval(waitInterval);
                    this.moveTo(portrait, currentPath, t);
            }
            
        }, 16)
    }

    animateTo = (portrait, currentPath, t) => {
        
    }

    moveTo = (portrait, currentPath, t) => {
        setTimeout(() => {
           
            this.snapTo(portrait, currentPath.svg, t);
            if (t >= path.svgPathProperties(currentPath.svg).getTotalLength()) {

                this.handledEvents.push(currentPath.event_id);
                //console.log(this.handledEvents);

                this.removeFirst(this.inProgressEvents, currentPath.event_id);
                if (portrait.paths.length > 0) {
                    this.startMoving(portrait);
                } else {
                    portrait.moving = false;
                }
                
            } else {
                this.moveTo(portrait, currentPath, t += this.travelStyleToSpeed(currentPath.style));
            }
        },25)
    }

    snapTo = (portrait, svg, t) => {
        portrait.location = path.svgPathProperties(svg).getPointAtLength(t);
        this.parent.forceUpdate();
    }

    removeFirst = (a, v) => {
        for( var i = 0; i < a.length; i++){ 
            if ( a[i] === v) { 
                a.splice(i, 1); i--;
                return;
            }
        }
    }

    intersects = (x, y) => {

        for (var i = 0; i < x.length; i++) {
            for (var z = 0; z < y.length; z++) {
                if (x[i] === y[z]) {
                    return true;
                }
            }
        }
        return false;
    }

    travelStyleToSpeed = (style) => {
        if (style === "gateway") {
            return 10;
        }
        if (style === "ways") {
            return 7;
        }
        if (style === "tar") {
            return 4;
        }
        if (style === "boat") {
            return 3;
        } else {
            return 2;
        }
    }
    */
}

export default PortraitManager;