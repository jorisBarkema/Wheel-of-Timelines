import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import MenuButton from './MenuButton.js'
import MenuShareIcons from './MenuShareIcons.js'
import PatreonMenuContainer from './PatreonMenuContainer.js';

class MainMenu extends React.Component {

    render = () => {
        return (
            <div className="left-menu">
                <Menu>
                    <MenuButton text="Home" link="/"></MenuButton>
                    <MenuButton text="Map" link="/map"></MenuButton>
                    <MenuButton text="Quizzes" link="/quizzes"></MenuButton>
                    <MenuButton text="Blog" link="/blog"></MenuButton>
                    <MenuButton text="Timeline" link="/timeline"></MenuButton>

                    <MenuShareIcons first={true} shareMessage="Share this website!"/>
                    <PatreonMenuContainer />
                </Menu>
            </div>
            
        )
    }
}

export default MainMenu;