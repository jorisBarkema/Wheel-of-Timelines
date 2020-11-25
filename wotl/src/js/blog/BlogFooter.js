import React from 'react';
import ReactGA from 'react-ga';
import Button from '@material-ui/core/Button';
import axios from "axios";

import ShareIcons from '../ShareIcons.js'

var images = require.context('../../assets', true);

class BlogFooter extends React.Component {

    render = () => {

        return (
            <div className="blogpost-footer">
                <h1>Did you enjoy this post?</h1>

                <div className="row">
                    <div className="col-12 col-lg-6 icons-container">
                        <h2>Share it on social media</h2>
                        <ShareIcons shareMessage="Share it"/>
                    </div>
                    <div className="col-12 col-lg-6">
                        <p>
                            Or join the mailing list to stay up to date on new posts:
                        </p>
                        <div className="subscribe-container row">
                            <div className="col-12">
                                <input type="text" name="mail"/>
                            </div>
                            <div className="col-12">
                                <Button
                                    onClick={() => this.addToMailingList(document.getElementsByName("mail")[0].value)}
                                    variant="contained"
                                    color="primary"
                                    className={'button'}
                                    size="small">
                                    <img src={images('./icons8-email-send-32.png').default} alt="Subscribe to mailing list"/> Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    addToMailingList = (email) => {
        console.log("adding " + email + " to list");

        let data = {
            email: email
        };

        axios.post("http://wheeloftimelines.com/php/addtolist.php", data)
            .then(response => {

            //console.log(response);
            if (response.data.trim() === "success") {
                alert("You have been succesfully dubscribed to the email list!");
                ReactGA.event({
                    category: 'Mailing list',
                    action: 'Joined mailing list'
                });
            }
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong, please try again later.")
        });
    }
}

export default BlogFooter;