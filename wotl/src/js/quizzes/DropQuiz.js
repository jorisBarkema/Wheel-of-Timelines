import React from 'react';
import {isMobile} from 'react-device-detect';
import ReactGA from 'react-ga';

import URLImage from '../URLImage.js';

import MainMenu from '../MainMenu.js';
import ScoreResultContainer from './ScoreResultContainer.js';
import Quiz from './Quiz.js';

import { Stage, FastLayer, Layer, Path, Rect} from 'react-konva';

var images = require.context('../../assets', true);
const { pointInSvgPath } = require('point-in-svg-path');

class DropQuiz extends Quiz {

    constructor(props) {
        super(props);

        this.resizeHandler = this.setSize.bind(this);

        let columns = 3;

        let answered = {};

        for(let i = 0; i < props.data.questions.length; i++) {
            answered[props.data.questions[i].name] = "unanswered";
        }
        
        this.state = {
            title: props.data.title,
            questions: props.data.questions,
            titleImageSource: props.data.titleImageSource,
            titleImageCredit: props.data.titleImageCredit,
            titleImageArtist: props.data.titleImageArtist,
            dropAreaImageWidth: props.data.dropArea.width,
            dropAreaImageHeight: props.data.dropArea.height,
            dropWidth: 1,
            dropHeight: 1,
            scale: 1,
            questionColumns: columns,
            questionsAreaX: 1,
            questionsAreaY: 1,
            questionsAreaHeight: 1,
            questionAreaWidth: 250,
            questionImageWidth: props.data.questionImageWidth,
            questionImageHeight: props.data.questionImageHeight,
            questionHeight: 1,
            questionWidth: 1,
            questionScale: 1,
            answered: answered,
            done: false,
            score: 0,
            currentDropField: "none",
            padding: 15,
            dragStartX: 0,
            dragStartY: 0,
            currentDragX: 2597,
            currentDragY: 2057
        }
    }

    render = () => {

        let img_src = images("./" + this.state.titleImageSource);

        return (
            <div>
                <MainMenu />
                <div className="row">
                    <div className="col-xs-0 col-sm-2 side"></div>
                    <div className="col-xs-12 col-sm-8 content">
                    
                        <div id="title-container">
                            <img src={images('./banner-quizzes.png')} alt="Wheel of Timelines banner" />
                        </div>

                        <div className="inner-content quiz">
                            <div className="title white-text" style={{backgroundImage: "url(" + img_src + ")"}}>
                                <h1>{this.state.title}</h1>
                            </div>
                            <span className="credit"><a href={this.state.titleImageCredit}>image source</a> by {this.state.titleImageArtist} </span>

                            {
                                isMobile ? 
                                <div id="drop-inner">
                                    <div className="textblock">
                                        For now, sadly this type of quiz is not available for mobile devices.
                                        There were some problems which meant I could not make this live up to my standards.
                                        <br />
                                        Try some of the <a href="/quizzes">other quizzes</a> or try this quiz on desktop!
                                    </div>
                                </div>
                                : 
                                <div>
                                    <div className="textblock">
                                        {this.props.data.description}
                                    </div>
                                    <div id="drop-inner">
                                        <Stage
                                        ref={node => { this.stageRef = node}}
                                            width={this.state.dropWidth} 
                                            height={this.state.dropHeight}
                                            scaleX={this.state.scale}
                                            scaleY={this.state.scale}
                                            x={0}
                                            y={0}
                                            onMouseMove = {(e) => {
                                                if (this.state.dragging) {

                                                    this.setState({
                                                        currentDragX: e.evt.offsetX,
                                                        currentDragY: e.evt.offsetY,
                                                    })

                                                    if (e.evt.offsetX > this.state.dropWidth / 2 && this.state.zoomFieldRight) {
                                                        this.setState({
                                                            zoomFieldRight: false
                                                        })
                                                    }
                                                    if (e.evt.offsetX < this.state.dropWidth / 2 && !this.state.zoomFieldRight) {
                                                        this.setState({
                                                            zoomFieldRight: true
                                                        })
                                                    }
                                                }
                                            }}

                                            onMouseDown = {(e) => {
                                                console.log(this.getDropAreaX(e.evt.offsetX));
                                                console.log(this.getDropAreaY(e.evt.offsetY));
                                            }}

                                            onMouseUp = {(e) => {
                                                if (this.state.dragging) {
                                                    this.setState({
                                                        dragging: false
                                                    })
                                
                                                    let mapx = this.getDropAreaX(e.evt.offsetX);
                                                    let mapy = this.getDropAreaY(e.evt.offsetY);
                                
                                                    this.checkDragEndedInNation(mapx, mapy);
                                                    document.body.style.cursor = 'default';
                                                }
                                            }}
                                        >
                                            <FastLayer>
                                                <Rect 
                                                    x={0} y={0}
                                                    width={this.state.dropWidth / this.state.scale} 
                                                    height={this.state.dropHeight / this.state.scale}
                                                    fill={"rgb(212, 212, 212)"}
                                                />
                                                <URLImage 
                                                    listening={false} 
                                                    enablePerfectDrawing={false} 
                                                    src={images("./" + this.props.data.dropArea.image)}
                                                    x={this.props.data.dropArea.offsetx}
                                                    y={this.props.data.dropArea.offsety}
                                                />
                                            </FastLayer>

                                            <Layer>
                                                {
                                                    this.state.questions.map((question, index) => {
                                                        return this.questionToDropField(question, index);
                                                    })
                                                }
                                            </Layer>

                                            <FastLayer>
                                                {
                                                    this.state.questions.map((question, index) => {
                                                        return this.state.answered[question.name] !== "unanswered" ? 
                                                            <URLImage 
                                                                listening={false} 
                                                                enablePerfectDrawing={false} 
                                                                src={images("./" + question.dropImage)}
                                                                x={this.props.data.dropArea.offsetx + question.dropLocationX}
                                                                y={this.props.data.dropArea.offsety + question.dropLocationY}
                                                                key={index}
                                                            /> : null;
                                                    })
                                                }
                                            </FastLayer>

                                            <Layer>
                                                <Rect 
                                                    x={this.state.questionsAreaX} y={this.state.questionsAreaY}
                                                    width={this.state.questionAreaWidth / this.state.scale} height={this.state.questionsAreaHeight / this.state.scale}
                                                    fill={"rgb(212, 212, 212)"}
                                                />
                                                {
                                                    this.state.questions.map((question, index) => {
                                                        return this.state.answered[question.name] === "unanswered" ? this.questionToDraggable(question, index) : null;
                                                    })
                                                }
                                            </Layer>
                                        </Stage>

                                        {this.state.done ? <ScoreResultContainer score={this.state.score} total={this.state.questions.length} messages={{"bad": this.props.data.endMessageBad, "good": this.props.data.endMessageGood, "perfect":this.props.data.endMessagePerfect}} image={this.state.titleImageSource}/> : null}
                                    </div>
                                </div>
                            }
                            
                        </div>
                    </div>
                    <div className="col-xs-0 col-sm-2 side"></div>
                </div>
            </div>
        )

    }
    
    componentDidMount = () => {
        this.setSize();

        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.resizeHandler);
    }

    setSize = () => {
        console.log("setting size");
        let w = document.getElementById("drop-inner").offsetWidth;

        let s = (w - this.state.questionAreaWidth) / this.state.dropAreaImageWidth;
        let h = this.state.dropAreaImageHeight * s;

        // total = padding + columns * (width + padding)
        // dus (total - padding) / columns = width + padding
        // dus (total - padding) / columns - padding = width

        let questionWidth = (this.state.questionAreaWidth - this.state.padding) / this.state.questionColumns - this.state.padding;
        
        let questionHeight = this.state.questionImageHeight * (questionWidth / this.state.questionImageWidth);

        h = Math.max(h, this.state.padding + Math.ceil(this.state.questions.length / this.state.questionColumns) * (this.state.padding + questionHeight));
        

        this.setState({
            dropWidth: w,
            dropHeight: h,
            scale: s,
            questionWidth: questionWidth,
            questionHeight: questionHeight,
            questionScale: (1 / s * (questionWidth / this.state.questionImageWidth)),
            questionsAreaHeight: h, //Math.ceil(this.props.data.questions.length / this.state.questionColumns) * (questionHeight + this.state.padding) + this.state.padding
            questionsAreaX: (w - this.state.questionAreaWidth) / s,
            questionsAreaY: 0
        })
    }

    questionToDropField = (question, index) => {

        let border = question.border;
        let borderColor = this.questionToBorderColour(question);
        let fillColor = this.questionToFillColour(question);

        let path = <Path
                name={question.name}
                x={this.props.data.dropArea.offsetx}
                y={this.props.data.dropArea.offsety}
                stroke={borderColor}
                shadowColor= {borderColor}
                shadowBlur = {20}
                strokeWidth={8}
                data={border}
                fill={fillColor}
                key={index}
                opacity={1}
                onMouseOver = {(evt) => {
                    
                    let name = evt.target.attrs.name;

                    //console.log(name);

                    this.setState({
                        currentDropField: name
                    })
                }}
                onMouseOut = {(evt) => {
                    
                    //console.log("none");

                    this.setState({
                        currentDropField: "none"
                    })
                }}
                onTouchMove = {(e) => {

                    let name = e.target.attrs.name;

                    this.setState({
                        currentDropField: name
                    })
                }}
        />
        return path
    }

    questionToBorderColour = (question) => {
        if (this.state.answered[question.name] === "correct") {
            return "rgb(61, 254, 0)"
        }
        if (this.state.answered[question.name] === "incorrect") {
            return "rgb(255, 0, 0)"
        }
        if (this.state.currentDropField === question.name) {
            return "rgb(105, 105, 105)";
        }
        return "rgba(105, 105, 105, 0.4)"
    }

    questionToFillColour = (question) => {
        if (this.state.answered[question.name] === "correct") {
            return "rgba(61, 254, 0, 0.1)"
        }
        if (this.state.answered[question.name] === "incorrect") {
            return "rgba(255, 0, 0, 0.1)"
        }
        if (this.state.currentDropField === question.name) {
            return "rgba(105, 105, 105, 0.1)";
        }
        return "rgba(105, 105, 105, 0.05)"
    }

    getDraggablePositionX = (question, index) => {
        if (question.name === this.state.currentDraggable && this.state.dragging) {
            //console.log("returning currentDragX " + this.state.currentDragX);
            return ((this.state.currentDragX - this.state.questionWidth / 2) / this.state.scale);
        }

        //this.state.dropWidth

        return (this.state.dropWidth - this.state.questionAreaWidth + (index % this.state.questionColumns) * (this.state.questionWidth + this.state.padding) + this.state.padding) / this.state.scale;
    }

    getDraggablePositionY = (question, index) => {
        if (question.name === this.state.currentDraggable && this.state.dragging) {
            //console.log("returning currentDragY " + this.state.currentDragY);
            return ((this.state.currentDragY - this.state.questionHeight / 2) / this.state.scale);
        }

        //return (this.state.padding + Math.floor(index / this.state.questionColumns) * (this.state.questionHeight + this.state.padding)) / this.state.scale;

        return (this.state.padding + Math.floor(index / this.state.questionColumns) * (this.state.questionHeight + this.state.padding)) / this.state.scale;
    }

    questionToDraggable = (question, index) => {
        return (
            <URLImage 
                name={question.name}
                opacity={this.questionToOpacity(question)}
                src={images("./" + question.image)} 
                x={this.getDraggablePositionX(question, index)} 
                y={this.getDraggablePositionY(question, index)}
                scaleX={this.state.questionScale}
                scaleY={this.state.questionScale}
                key={index}

                onMouseOver = {(evt) => {
                    if (!this.state.dragging) {
                        document.body.style.cursor = 'grab';
                        let name = evt.target.attrs.name;

                        //console.log(name);

                        this.setState({
                            currentDraggable: name
                        })
                    }
                }}
                onMouseOut = {(evt) => {
                    
                    if (!this.state.dragging) {
                        document.body.style.cursor = 'default';
                    
                        //console.log("none");

                        
                        this.setState({
                            currentDraggable: "none",
                            dragging: false
                        })
                    }
                }}
                onMouseDown = {(e) => {
                    //console.log("starting drag");
                    //console.log(e.evt);
                    this.setState({
                        dragging: true,
                        currentDragX: e.evt.offsetX / this.state.scale,
                        currentDragY: e.evt.offsetY / this.state.scale,
                        
                        dragStartX: e.evt.offsetX / this.state.scale,
                        dragStartY: e.evt.offsetY / this.state.scale
                    })
                    document.body.style.cursor = 'grabbing';
                    e.target.moveToTop();

                    //console.log(evt);
                }}
                onTouchStart = {(e) => {
                    let name = e.target.attrs.name;

                    this.setState({
                        currentDraggable: name,
                        dragging: true,
                        currentDragX: e.evt.offsetX / this.state.scale,
                        currentDragY: e.evt.offsetY / this.state.scale,
                        
                        dragStartX: e.evt.offsetX / this.state.scale,
                        dragStartY: e.evt.offsetY / this.state.scale
                    })
                    e.target.moveToTop();
                }}
            />
        )
    }

    getDropAreaX = (offsetX) => -this.props.data.dropArea.offsetx + offsetX / this.state.scale;
    getDropAreaY = (offsetY) => -this.props.data.dropArea.offsety + offsetY / this.state.scale;

    getZoomFieldX = () => this.state.zoomFieldRight ? (this.state.dropWidth - this.state.zoomWidth) / this.state.scale : 0;

    questionToOpacity = (question) => {
        if (question.name === this.state.currentDraggable && this.state.dragging) return 0.5;
        return 1;
    }

    checkDragEndedInNation = (x, y) => {
        
        this.state.questions.map((question) => {

            if (pointInSvgPath(question.border, x, y) && this.state.answered[question.name] === "unanswered") {
                //console.log("drag ended in " + question.name);
                let new_answered = this.state.answered;
                if (this.state.currentDraggable === question.name) {
                    new_answered[this.state.currentDraggable] = "correct"
                } else {
                    new_answered[this.state.currentDraggable] = "incorrect"
                }

                this.setState({
                    answered: new_answered
                })

                //console.log(new_answered);
                let done = true;
                let score = 0;

                Object.keys(new_answered).map((key, index) => {
                    if (new_answered[key] === "unanswered") {
                        done = false;
                    }
                    if (new_answered[key] === "correct") {
                        score++;
                    }

                    return true;
                })

                if (done) {
                    console.log("quiz finished");
                    console.log("with a score of " + score);

                    this.setState({
                        score: score,
                        done: done
                    })

                    ReactGA.event({
                        category: 'Quiz',
                        action: 'Completed ' + this.state.title +  ' Quiz',
                        label: score.toString(),
                        value: score
                    });
                }
            }
            return null;
        })
        
    }
}

export default DropQuiz;