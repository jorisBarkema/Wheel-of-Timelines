import React from 'react';

//import ReactDOM from 'react-dom';

class PageMap extends React.Component {

    render = () => {
        return (
            <div className="pagemap" style={{top: 'calc(50% - ' + (this.totalHeight() / 2) + 'px)'}}>

                { this.props.items.map(
                    (item, index) => {
                        return (
                        <div key={index}>
                            <div id={"pagemap-" + index} className="pagemap-dot" onClick={() => this.handleScroll(this.props.itemType + "-" + index)}>
                            </div>
                        </div>)
                    }
                )}
            </div>
        );
    }

    handleScroll = (target) => {
        window.scrollTo({
            top: document.getElementById(target).offsetTop - 50,
            behavior: 'smooth'     
        })
    }

    totalHeight = () => {

        return (this.props.items.length * 35) + 25; // 25px mragin top, 10px height, 25px margin bottom (which overlaps with the margin of the one below)
        // should be dynamic based on the actual height of the elements but they are not ready yet when this is calculated
    }
}

export default PageMap;