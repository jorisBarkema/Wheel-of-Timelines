import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter  } from 'react-router-dom';

import MainMenu from './MainMenu.js'

var images = require.context('../assets', true);

class NotFoundPage extends React.Component {

    render = () => {

        return (
            <div id="not-found-body">
                <MainMenu />

                <div id="title-container">
                    <img src={images('./banner.png').default} alt="Wheel of Timelines banner" />
                </div>

                <div id="page-not-found-container">
                    <h1>404: Page not found</h1>
                    <p>The requested page does not exist</p>

                    <h1 onClick={() => this.props.history.push('/')}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={'button'}
                            size="large">
                            <img src={images('./icons8-email-send-32.png').default} alt="Go to homepage"/> Go back to the homepage
                        </Button>
                    </h1>
                </div>
                
            </div>
        )
    }
}

export default withRouter(NotFoundPage);