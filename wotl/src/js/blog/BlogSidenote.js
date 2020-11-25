import React from 'react';
import ReactGA from 'react-ga';

var images = require.context('../../assets', true);

class BlogSideNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            display: false
        };
    }

    render = () => {

        let info_icon = images('./blog_assets/info-icon.png').default;
        let spoiler_icon = images('./blog_assets/spoiler-icon.png').default;

        // <span className="sidenote-icon" onClick={() => this.switchDisplay()}><img src={info_icon} alt="info" /></span>
        return (
            <span className="blogpost-sidenote">
                {
                    this.state.display ?
                    <div id="content" 
                        style={this.props.spoiler ? 
                        {
                            backgroundColor: "#f75b5b",
                            border: "2px solid #b92828",
                            borderRadius: "4px"
                        }
                        : 
                        {
                            backgroundColor: "#77c7ff",
                            border: "2px solid #4a96ff",
                            borderRadius: "4px"
                        }}
                    >
                        <img id="close-image" src={images('./icons8-close-window-52.png').default} alt="X" onClick={() => this.switchDisplay()}/>
                        {this.props.children} 
                    </div> : 
                    <img className="sidenote-icon" onClick={() => this.switchDisplay()} src={this.props.spoiler ? spoiler_icon : info_icon} alt="info" />
                }
            </span>

            
        )
    }

    switchDisplay = () => {

        ReactGA.event({
            category: 'Blog',
            action: 'Switched sidenote display',
            label: (this.state.display ? "off": "on")
        });

        this.setState({
            display: !this.state.display
        })
    }
}

export default BlogSideNote;