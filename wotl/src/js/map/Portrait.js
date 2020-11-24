import React from 'react';
import { Circle} from 'react-konva';

class Portrait extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            x: this.props.x,
            y: this.props.y
        }
    }
    
    render = () => {
        return (
            <Circle perfectDrawEnabled={false} listening={false} radius={this.props.radius} 
                x={this.state.x} y={this.state.y}
                fillPatternImage={this.props.image} 
                fillPatternScaleX={this.props.ratio} fillPatternScaleY={this.props.ratio}
                fillPatternOffsetX={this.props.width / 2} fillPatternOffsetY={this.props.height / 2}
            />
        )
    }

    setLocation = (x, y) => {
        console.log("hi");
        /*
        this.setState({
            x: x,
            y: y
        })
        */
    }
}

export default Portrait