import React from 'react';
import { withRouter  } from 'react-router-dom';

class MenuButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            link: props.link
        };
    }

    render = () => {
        return (
            <div className="menu-button"
            onClick={() => this.props.history.push(this.state.link)}>
                <span>{this.state.text}</span>
            </div>
        )
    }
}

export default withRouter(MenuButton);