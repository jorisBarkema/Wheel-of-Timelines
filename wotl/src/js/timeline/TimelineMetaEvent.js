import React from 'react';

var images = require.context('../../assets', true);

class TimelineMetaEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: this.props.event.image,
            imageSource: this.props.event.imageSource,
            imageArtist: this.props.event.imageArtist
        }
    }

    render = () => {
        let img_src = images('./' + this.state.image);

        return (
            <tr id={"book-" + this.props.event.book} className="meta-event">
                <td
                    style={{backgroundImage: "url(" + img_src + ")", textAlign: "center"}} 
                    colSpan={this.props.double ? "6": "4"} className="white-text image-full-background">
                        <h3>{this.props.event.title}</h3>
                        <span className="timeline-credit"><a href={this.state.imageSource}>image source</a> by {this.state.imageArtist} </span>
                </td>
            </tr>
        )
    }

    componentDidUpdate = () => {
        if (this.state.image !== this.props.event.image) {
            this.setState({
                image: this.props.event.image
            })
        }
        if (this.state.imageArtist !== this.props.event.imageArtist) {
            this.setState({
                imageArtist: this.props.event.imageArtist
            })
        }
        if (this.state.imageSource !== this.props.event.imageSource) {
            this.setState({
                imageSource: this.props.event.imageSource
            })
        }
    }
}

export default TimelineMetaEvent