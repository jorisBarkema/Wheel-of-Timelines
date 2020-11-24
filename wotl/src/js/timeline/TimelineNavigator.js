import React from 'react';
import {isMobile} from 'react-device-detect';

var images = require.context('../../assets', true);

class TimelineNavigator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentBook: props.currentBook,
            nextBookVisible: false
        }
    }

    render = () => {

        let current_img_src = images('./' + this.getImage(this.state.currentBook));

        let next_book = this.getNextVisibleBook()
        let next_img_src = null;

        if (next_book !== null) {
            next_img_src = images('./' + this.getImage(next_book));
        }

        let previous_book = this.getPreviousVisibleBook();
        let previous_img_src = null;

        if (previous_book !== null) {
            previous_img_src = images('./' + this.getImage(previous_book));
        }

        return (
            <div id="timeline-navigator-container" className="row">
                <div className="col-4 navigator-header">
                    <p>Previous book</p>
                </div>
                <div className="col-4 navigator-header">
                    <p>Current book</p>
                </div>
                <div className="col-4 navigator-header">
                    <p>Next book</p>
                </div>
                {
                    previous_book === null ? 
                        <div className={"navigator-button col-4 white-text image-full-background"} style={{cursor: "default"}}>
                        </div> :
                        <div 
                            className={"navigator-button col-4 white-text image-full-background"} 
                            style={{backgroundImage: "url(" + previous_img_src + ")"}}
                            onClick={() => this.smoothScrollToBook("book-" + previous_book)}
                        >
                            <p>{this.getTitle(previous_book)}</p>
                        </div>
                }
                <div 
                    className={"navigator-button col-4 white-text image-full-background"} 
                    style={{backgroundImage: "url(" + current_img_src + ")"}}
                    onClick={() => this.smoothScrollToBook("book-" + this.state.currentBook)}
                >
                    <p>{this.getTitle(this.state.currentBook)}</p>
                </div>
                {
                    next_book === null ? 
                        <div className={"navigator-button col-4 white-text image-full-background"} style={{cursor: "default"}}>
                        </div> : 
                        <div 
                            className={"navigator-button col-4 white-text image-full-background"} 
                            style={{backgroundImage: "url(" + next_img_src + ")"}}
                            onClick={() => this.smoothScrollToBook("book-" + next_book)}
                        >
                            <p>{this.getTitle(next_book)}</p>
                        </div>
                }
            </div>
        )
    }

    changeCurrentBook = (nr) => {
        this.setState({
            currentBook: nr
        })
    }

    getNextVisibleBook = () => {
        for(let i = this.state.currentBook + 1; i < 15; i++) {
            let el = document.getElementById("book-" + i);

            if (el !== null) {
                return i;
            }
        }

        return null;
    }

    getPreviousVisibleBook = () => {
        for(let i = this.state.currentBook - 1; i >= 0; i--) {
            let el = document.getElementById("book-" + i);

            if (el !== null) {
                return i;
            }
        }

        return null;
    }

    smoothScrollToBook = (target) => {

        let tableOffsetTop = document.getElementById("timeline-table").offsetTop;

        window.scrollTo({
            top: tableOffsetTop + document.getElementById(target).offsetTop + 3,
            behavior: 'smooth'     
        })
    }

    getImage = (nr) => {

        switch(nr) {
            case 1:
                return "DKSweet-covers/Wheel-of-Time-DKS-Eye-of-the-World.jpg";
            case 2:
                return "DKSweet-covers/Wheel-of-Time-DKS-Great-Hunt.jpg";
            case 3:
                return "DKSweet-covers/Wheel-of-Time-DKS-Dragon-Reborn.jpg";
            case 4:
                return "DKSweet-covers/Wheel-of-Time-DKS-Shadow-Rising.jpg";
            case 5:
                return "DKSweet-covers/Wheel-of-Time-DKS-Fires-of-Heaven.jpg";
            case 6:
                return "DKSweet-covers/Wheel-of-Time-DKS-Lord-of-Chaos.jpg";
            case 7:
                return "DKSweet-covers/Wheel-of-Time-DKS-Crown-of-Swords.jpg";
            case 8:
                return "DKSweet-covers/Wheel-of-Time-DKS-Path-of-Daggers.jpg";
            case 9:
                return "DKSweet-covers/Wheel-of-Time-DKS-Winters-Heart.jpg";
            case 10:
                return "DKSweet-covers/Wheel-of-Time-DKS-Crossroads-of-Twilight.jpg";
            case 11:
                return "DKSweet-covers/Wheel-of-Time-DKS-Knife-of-Dreams.jpg";
            case 12:
                return "DKSweet-covers/Wheel-of-Time-DKS-Gathering-Storm.jpg";
            case 13:
                return "DKSweet-covers/Wheel-of-Time-DKS-Towers-of-Midnight.jpg";
            case 14:
                return "DKSweet-covers/Darrell-Sweet_Memory-of-Light_sketch.jpg";
            default:
                return "DKSweet-covers/Wheel-of-Time-DKS-Eye-of-the-World.jpg";
        }
    }

    getTitle = (nr) => {

        switch(nr) {
            case 1:
                return isMobile ? "1": "1 - The Eye of the World";
            case 2:
                return isMobile ? "2":  "2 - The Great Hunt";
            case 3:
                return isMobile ? "3":  "3 - The Dragon Reborn";
            case 4:
                return isMobile ? "4":  "4 - The Shadow Rising";
            case 5:
                return isMobile ? "5":  "5 - The Fires of Heaven";
            case 6:
                return isMobile ? "6":  "6 - Lord of Chaos";
            case 7:
                return isMobile ? "7":  "7 - A Crown of Swords";
            case 8:
                return isMobile ? "8":  "8 - The Path of Daggers";
            case 9:
                return isMobile ? "9":  "9 - Winter's Heart";
            case 10:
                return isMobile ? "10":  "10 - Crossroads of Twilight";
            case 11:
                return isMobile ? "11":  "11 - Knife of Dreams";
            case 12:
                return isMobile ? "12":  "12 - The Gathering Storm";
            case 13:
                return isMobile ? "13":  "13 - Towers of Midnight";
            case 14:
                return isMobile ? "14":  "14 - A Memory of Light";
            default:
                return isMobile ? "1":  "1 - The Eye of the World";
        }
    }
}

export default TimelineNavigator