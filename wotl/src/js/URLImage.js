import React from 'react';
import { Image } from 'react-konva';

// from the react documentation

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
class URLImage extends React.Component {

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
    //componentWillUnmount() {
      //this.image.removeEventListener('load', this.handleLoad);
    //}
    loadImage() {
      // save to "this" to remove "load" handler on unmount
      //console.time(this.props.src + "  loading");
      this.image = new window.Image();
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
      // after setState react-konva will update canvas and redraw the layer
      // because "image" property is changed
      this.setState({
        image: this.image
      }, () => {
        //console.timeEnd(this.props.src + "  loading");
        if (this.props.onImageLoaded) this.props.onImageLoaded();
      });
      
      // if you keep same image object during source updates
      // you will have to update layer manually:
      // this.imageNode.getLayer().batchDraw();
    };
    render() {
      return (
        <Image
            name={this.props.name}
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height}
            opacity={this.props.opacity}
            stroke={this.props.stroke}
            shadowColor={this.props.shadowColor}
            shadowBlur={this.props.shadowBlur}
            scaleX={this.props.scaleX}
            scaleY={this.props.scaleY}
            image={this.state.image}
            draggable={this.props.draggable}
            listening={this.props.listening}
            onDragStart={this.props.onDragStart}
            onDragEnd={this.props.onDragEnd}
            onMouseOver={this.props.onMouseOver}
            onMouseOut={this.props.onMouseOut}
            onMouseDown={this.props.onMouseDown}
            onMouseUp={this.props.onMouseUp}
            onMouseMove={this.props.onMouseMove}
            ref={node => {
            this.imageNode = node;
            }}
        />
      );
    }
  }

  export default URLImage;