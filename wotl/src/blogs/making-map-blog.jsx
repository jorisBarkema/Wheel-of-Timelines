import React from 'react';

import BlogSidenote from '../js/blog/BlogSidenote.js'

var images = require.context('./../assets', true);

function post() {
    return (
        <div>
            <div className="blogpost-paragraph col-12">
                <p>
                    <b>You can find the completed map with timeline and character routes <a href="/map">here</a>.</b>
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    I want to start this blog by thanking everyone who visited the site, answered the poll and a special thanks to the patrons! 
                    Together with this second blog post I have added everything up until the end of Winter’s Heart, with a tiny little bit of Crossroads of Twilight to the timeline.
                    Another new feature is the character routes, which are complete for the first three books and most of the fourth book.
                    Finally, if you are using the site on your phone the map will default to a lower detal version of the map to make it smoother. You can switch to the HD version in the menu.
                    I will try to finish the timeline this month, and also add another quiz about the Forsaken. But first, the Making of a Map.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    Most of the map is based on two maps: the official Wheel of Time map of the Westlands,
                    <BlogSidenote>
                        <p>
                            The Westlands map has some character routes on it, but for my purpose that doesn't matter and this was the highest resolution I could find.
                        </p>
                    </BlogSidenote>
                    and a map of the Waste I found on the Atlas of Ice and Fire blog, 
                    which itself is based on another map on the Thirteenth Depository’s blog. Laying these two maps on top of each other gives a complete basis for the Westlands 
                    combined with the Waste, as seen below.
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/maps.jpg').default} alt="The maps my map is largely based on."/>
                <p>
                The maps my map is largely based on, merged to overlap correctly. Westlands map by Elissa Mitchell, Aiel Waste map from <a href="https://atlasoficeandfireblog.wordpress.com/2018/09/23/the-wheel-of-time-atlas-the-aiel-waste/">Atlas of Ice and Fire</a>
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                I am most definitely not an artist, but luckily for me there are some great videos on Youtube which helped a lot. 
                Mainly I watched the videos from <a href="https://www.youtube.com/channel/UCaHAEpzaOOXqJ-_3UpDk0lg">Pen &amp; Blade</a> to learn how to draw
                mountains, a coastline and forests. I also generally followed the recommended order in drawing the map:
                <br />
                <br />
                <ol>
                    <li>Mountains</li>
                    <li>Rivers</li>
                    <li>Coasts</li>
                    <li>Villages</li>
                    <li>Forest</li>
                </ol>

                However, personally I did the coast first because in this case I already knew exactly what that was going to look like. 
                I also did not strictly follow this order for the entire map, 
                but per region because otherwise it would become very repetitive to draw 1000
                <BlogSidenote>
                    <p>
                        There are (as of the writing of this post) actually 431 mountains on the map, and 217 hills!
                    </p>
                </BlogSidenote>
                mountains one after another. 
                It is great for seeing how the map slowly comes together though, as you can see in the picture where only the coastline, 
                mountains and hills have been added.
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/coast-mountains-bw.png').default} alt="Mountains and Coast"/>
                <p>
                    Purely the coastline and the mountain ranges already gives a pretty good idea of the layout of the world.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    The next step is adding the rivers, desert, forest and general decorations to make the map less empty. 
                    Some rivers do not completely match the map of the Westlands. I made small changes to them to get them to always start in a mountain range, 
                    because that is how rivers generally work.
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/no-cities-no-background.png').default} alt="Rivers, forest and decorations"/>
                <p>
                    There are three major landmarks added on the map, coincidentally all based on hands. I will probably slowly add more, become a patron to let me know which one you would like to see!
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    With all of this added, the map is starting to come together, but it is not done yet. 
                    The next step is to add the roads and the cities, and of course the names because a map without names is much less useful.
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/everything-no-background.png').default} alt="Finished no background"/>
                <p>
                    We also fill in the holes in the forests which before this step might have seemed odd. This is the reason that it is recommended to add the forest last!
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    The layout of the map is now done. I chose not to include national borders because it is not completely clear where they should be exactly, 
                    and there is a lot of unclaimed land in some areas. I plan to include this when I add some more information for important places.
                    And as a finishing touch add some backgrounds. Do not be fooled by how great it looks, I can't draw at all! 
                    I added the background colours and the wave effect of the ocean using Photoshop filters. 
                    <BlogSidenote>
                        <p>
                            Specifically the Filter → Render → Clouds for a nice subtle colour changing background, and then the waves of the ocean are added with Filter → Oil Paint.
                        </p>
                    </BlogSidenote>
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/Map-LD.jpg').default} alt="Finished"/>
                <p>
                    The finished map. A higher resolution version can be found in the menu when you visit the map.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    As I mentioned earlier, the map is based on two other maps. 
                    However, there are also some places on this map which are not on the other two maps. Mostly small places such as Abila and Kore Springs. 
                    The location of these villages may not be completely accurate, for some all that is known is a brief description like 'Northern Altara' or 'Braem Wood'.
                    To get the most accurate location for these places, I also used information about the travels made in the books. 
                    For example, Min, Siuan, Leane and Logain travel through Kore Springs on their journey from Tar Valon to Salidar.
                    Of course they did not know they would be going to Salidar when they left Tar Valon, but we also know they made a stop in Lugard.
                    Based on this I placed Kore Springs near the road from Tar Valon to Lugard, instead of for example in the south eastern section of the Braem Wood.
                </p>
            </div>
        </div>
    )
}

export default post;