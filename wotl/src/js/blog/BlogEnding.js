import React from 'react';

import MenuShareIcons from '../MenuShareIcons.js'

var images = require.context('../../assets', true);

class BlogEnding extends React.Component {

    render = () => {

        return (
            <div id="blog-ending" className="textblock">

                <div className="row">
                    <div className="col-12 col-md-6">
                        <h1>Bye!</h1>
                        <MenuShareIcons shareMessage="Did you enjoy reading this blog? Please share it!"/>
                    </div>
                    <div className="col-12 col-md-6 image-full-background" style={{backgroundImage: "url(" + this.props.img_src + ")"}}>
                    
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogEnding;