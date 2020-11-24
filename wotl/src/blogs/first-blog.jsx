import React from 'react';

import BlogSidenote from '../js/blog/BlogSidenote.js'

var images = require.context('./../assets', true);

function post() {
    return (
        <div>
            <div className="blogpost-paragraph col-12">
                <p>
                    Like many Wheel of Time fans I was very excited when Amazon announced the Wheel of Time show. 
                    I told myself I would wait with rereading the books to make sure I finished around the time the show would be released, 
                    but of course once the idea was there I could not stop myself and began reading The Eye of the World, almost 10 years after I first started the series. 
                    My love for the Wheel of Time, which had been on the background for some time, was completely revived. 
                    As I was already looking for a programming project to do in my free time I wanted to do something with the books.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    Not surprisingly for a Wheel of Time fan, I love many other fantasy books and series. 
                    So when the Witcher series was released I watched that, and the interactive map they released gave me the idea to do something similar for the Wheel of Time. 
                    This led to the first version of wheeloftimelines.com, where I tracked the main characters on their journey through the first three books. 
                    While I was somewhat pleased with the end result, it left a lot to be desired, especially on the finishing touches and usability.
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/oldTimelineMap.png')} alt="Screenshot of the old Wheel of Timelines map"/>
                <p>
                    A screenshot of the first version of the timeline map.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    While working on this project I also began learning React and I started making a page with quizzes 
                    as something to do with it that would fit well with the strengths of React. 
                    <BlogSidenote>
                        <p>
                            If you would like blog posts about the more technical aspects of this website, let me know in the survey!
                        </p>
                    </BlogSidenote>

                    Already having the wheeloftimelines domain it felt natural to make the quizzes Wheel of Time-themed and combine the two projects in one website. 
                    Redoing the map with React and also already having a much better idea of what I would want also produced a much better result than the first attempt. 
                    One major obstacle was the lack of a detailed map combining the Westlands and the Aiel waste. 
                    <BlogSidenote>
                        <p>
                        The main reason, other than it being a lot of work, for stopping after book 3 in the first version was that in book 4 a great many events take place in the Aiel waste.
                        </p>
                    </BlogSidenote>
                    I tried looking for one, 
                    but to my great surprise could not find one wherever I looked! There definitely are maps combining the Westlands and the Waste (which I based my map on), 
                    but they are all very undetailed or otherwise unusable for this purpose. Finally I decided that if it’s not there, I would make one myself 
                    <BlogSidenote>
                        <p>
                            I am also planning on writing a separate blog post about the making of this map.
                        </p>
                    </BlogSidenote>
                    and used this, admittedly less well made than the previous one because I am not an artist, map for the second version of the timeline map.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                The project was coming along quite well and I was learning a lot about React, 
                so to complete the website I decided to add a blog where I would post about how the website was made. 
                <BlogSidenote>
                    <p>
                        Obviously, since you are reading this right now.
                    </p>
                </BlogSidenote>
                I will end this first post by including a link to a quick survey asking questions about possible blog post topics and what sort of features 
                people would like to be added to the website, such as for example the option to make your own quizzes or more interactive elements on the map. 
                I appreciate every reply to this survey because it really helps me to make this website better. If you came this far, 
                thank you for reading this first blog post on wheeloftimelines.com, and I hope you enjoy the website! <br />
                <br />
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdKQD27eRHEt9wLZuAdcaXheiHGdUf7TDoPvGmK_0JSsgny8w/viewform?usp=sf_link">Please fill out this form!</a>
                </p>
            </div>
        </div>
    )
}

export default post;