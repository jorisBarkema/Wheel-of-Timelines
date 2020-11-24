import React from 'react';
import { navigate } from "hookrouter";

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
            onClick={() => navigate(this.state.link)}>
                <span>{this.state.text}</span>
            </div>
        )
    }
}

export default MenuButton;