import React from 'react';
import {Helmet} from 'react-helmet'

import Footer from './Footer.js'

class Page extends React.Component {

    render = () => {

        return (
            <div>
                <Helmet>
                    <title>{this.props.title}</title>
                    <meta name="description" content={this.props.description} />
                </Helmet>
                {this.props.element}
                <Footer />
            </div>
        )
    }
}

export default Page