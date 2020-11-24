import React from 'react';
import { Image } from 'react-konva';

class CustomImage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: null
        };
    }

    componentDidMount() {
      this.loadImage();
    }

    componentDidUpdate(oldProps) {
      if (oldProps.src !== this.props.src) {
        this.loadImage();
      }
    }

    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }

    loadImage() {
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image
      });
    };

    render() {
      return (
        <Image
            x={this.props.x}
            y={this.props.y}
            scaleX={this.props.scaleX}
            scaleY={this.props.scaleY}
            image={this.state.image}
            listening={this.props.listening}
            enablePerfectDrawing={this.props.enablePerfectDrawing}
            ref={node => {
            this.imageNode = node;
            }}
        />
      );
    }
  }

  export default CustomImage;