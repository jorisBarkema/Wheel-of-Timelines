import React from 'react';

class BlogQuote extends React.Component {
    render = () => {
        return (
            <div className="blogpost-quote col-12">
                <p>
                    “{this.props.children}”
                </p>
                <p style={{textAlign: "right"}}>
                    ― {this.props.author}
                </p>
            </div>
        )
    }
}

export default BlogQuote