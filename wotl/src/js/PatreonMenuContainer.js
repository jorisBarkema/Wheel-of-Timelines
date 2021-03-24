import React from 'react'

var images = require.context('../assets', true);

class PatreonMenuContainer extends React.Component {

    render = () => {

        let id = this.props.first ? "menu-first-container" : "";
        let patreon_src = images("./become_a_patron_button.png").default;

        return (
            <div className="menu-container" id={id}>
                <h2>Support the website</h2>
                <div className="menu-div">
                    <a href="https://www.patreon.com/wheeloftimelines?fan_landing=true" target="_blank" rel="noopener noreferrer"><img id="patreon" src={patreon_src} alt="Wheel of Time"></img></a>
                </div>
            </div>
        )
    }
}

export default PatreonMenuContainer