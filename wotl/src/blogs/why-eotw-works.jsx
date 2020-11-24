import React from 'react';

import BlogSidenote from '../js/blog/BlogSidenote.js'
import BlogQuote from '../js/blog/BlogQuote.js'

var images = require.context('./../assets', true);

function post() {
    return (
        <div>
            <div className="blogpost-paragraph col-12">
                <p>
                    If you are reading this, then it is fair to assume that you have read The Eye of the World, and enjoyed reading it. 
                    For that reason I will not mark any spoilers for The Eye of the World. However, I will mark spoilers for the other books of the series. 
                    Anything that could spoil the rest of the series will be in a clickable
                    <BlogSidenote spoiler>
                        <p>
                            I may contain spoilers for the entire series!
                        </p>
                    </BlogSidenote>
                    sidenote. They may contain spoilers for the entire series so be careful if you have not finished the series yet! 
                    There is a reason we can relate so well to these characters, while their lives are so different from ours, 
                    and even their world is so different from our own world. In this post I will discuss some aspects of why The Eye of the World 
                    works as well as it does at making the reader feel invested in the characters and their journey.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <h2>Characters</h2>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    Let’s begin by discussing the characters. Every main character in The Eye of the World can be assigned an archetype to which it belongs. 
                    For example, if I would ask anyone “Who is The Mentor?” they would answer Moiraine, and if I would ask anyone “Who is The Chosen One?” they would answer Rand.
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/moiraineteaching.jpg')} alt="Moiraine as Mentor"/>
                <p>
                    Moiraine's role as Mentor is to guide the inexperienced Emond's Fielders as they begin their adventure. She also becomes a very literal mentor for Egwene, teaching her to channel the One Power. <a href="https://i.imgur.com/s0EoB8W.jpg">Image source</a> by Lightwaved.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    These archetypes exist because they are inherently relatable, and therefore show up in many stories and in all stages of history. 
                    They are based on an idea from Swiss psychologist <a href="https://en.wikipedia.org/wiki/Carl_Jung">Carl Jung</a>. 
                    Jung believed that the unconscious was the source of a higher understanding and meaning, and coined the term the <a href="https://en.wikipedia.org/wiki/Collective_unconscious">Collective Unconscious</a>.
                </p>
            </div>


            <BlogQuote author="Carl Jung">
                A deeper level of the human unconscious wherein are found the archetypes — primordial psychological forms that exist in everyone's psyche.
            </BlogQuote>

            <div className="blogpost-paragraph col-12">
                <p>
                    According to Jung, this collective unconscious exists in each person together with their personal immediate consciousness. The archetypes then are highly developed elements of the Collective Unconscious, or as Jung described them
                </p>
            </div>


            <BlogQuote author="Carl Jung">
                forms or images of a collective nature which occur practically all over the earth as constituents of myths and at the same time as individual products of unconscious origin.
            </BlogQuote>

            <div className="blogpost-paragraph col-12">

                <p>
                    You cannot make a complete list of all of the archetypes since they intertwine with each other and share qualities. However, from studying myths, literature and other kinds of storytelling we can try to recognize them.
                    The website TV-Tropes has made a <a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/ArchetypalCharacter">list of commonly used archetypes</a>, which I used for each main character from The Eye of the World. Of course not everything fits perfectly, 
                    but generally each character fits with their archetype in personality and role in the story.
                </p>
            
                <table>
                    <tr>
                        <th>Character</th>
                        <th>Archetype</th>
                    </tr>
                    <tr>
                        <td>Rand</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/TheChosenOne">The Chosen One</a></td>
                    </tr>
                    <tr>
                        <td>Mat</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/TheTrickster">The Trickster</a></td>
                    </tr>
                    <tr>
                        <td>Perrin</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/WolfMan">Wolf Man</a></td>
                    </tr>
                    <tr>
                        <td>Moiraine</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/MentorArchetype">The Mentor</a></td>
                    </tr>
                    <tr>
                        <td>Thom</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/TheStoryteller">The Storyteller</a></td>
                    </tr>
                    <tr>
                        <td>Egwene</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/MyGirlBackHome">My Girl Back Home</a></td>
                    </tr>
                    <tr>
                        <td>Lan &amp; Nynaeve</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/StarCrossedLovers">Star-crossed Lovers</a></td>
                    </tr>
                    <tr>
                        <td>The Dark One</td>
                        <td><a href="https://tvtropes.org/pmwiki/pmwiki.php/Main/TheCorrupter">The Corrupter</a></td>
                    </tr>
                </table>

                <p>
                    The one that fits least from the table is probably Egwene with the My Girl Back Home archetype, because she does not stay at home.

                    <BlogSidenote spoiler>
                        <p>
                            Later we also find out that the The Corrupter was not actually the Dark One, but Ishamael. 
                            On top of this, further in the series some characters no longer fit their archetype from The Eye of the World. Egwene stops being someone Rand feels he must protect,
                            and Lan and Nynaeve are no longer star-crossed.
                        </p>
                    </BlogSidenote>

                    The reason I matched her with this archetype is because in The Eye of the World, she does not have a strong role of her own yet, 
                    and mostly is important in Rand's head as someone he feels he must protect and is worried about. She does have her own storylines with Perrin and being trained by Moiraine,
                    but The Eye of the World is very much Rand's book, although that changes a bit in the rest of the series.

                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    The characters also reference real-world mythology a lot throughout the series, 
                    but this mainly shows up in later books and not The Eye of the World
                    <BlogSidenote spoiler>
                        <p>
                            Quick side note with some examples for the three ta’veren: Rand has one very obvious reference to the <a href="https://en.wikipedia.org/wiki/King_Arthur">Arthurian legend</a> with him literally pulling the Sword from the Stone (of Tear). 
                            Also, his name al’Thor sounds like Arthur and Egwene al’Vere sounds like Guinevere. His relationship with Egwene also has some similarities with Arthur's relationship with Guinevere. 
                            Mat has some parallels with <a href="https://en.wikipedia.org/wiki/Odin">Odin</a> with his ravens and the loss of his eye. Perrin has strong connections to the slavic <a href="https://en.wikipedia.org/wiki/Axe_of_Perun">Perun</a> and his hammer mah’alleinir references Thor’s hammer <a href="https://en.wikipedia.org/wiki/Mj%C3%B6lnir">Mjolnir</a>.
                        </p>
                    </BlogSidenote>
                    so I will not go into that here.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <h2>Plot</h2>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    While having interesting characters goes a long way to write a good book, the plot is another important aspect. 
                    For this, we turn to another very well-known story-telling tool: <a href="https://en.wikipedia.org/wiki/Hero%27s_journey">The Hero’s Journey</a>. 
                    In his book <a href="https://en.wikipedia.org/wiki/The_Hero_with_a_Thousand_Faces">"The Hero with a Thousand Faces"</a>, <a href="https://en.wikipedia.org/wiki/Joseph_Campbell">Joseph Campbell</a> describes a template for various categories of stories, 
                    basing his work upon Carl Jung’s earlier work on Archetypes.
                </p>
            </div>

            <BlogQuote author="Joseph Campbell">
                A hero ventures forth from the world of common day into a region of supernatural wonder: fabulous forces are there encountered and a decisive victory is won: 
                the hero comes back from this mysterious adventure with the power to bestow boons on his fellow man.
            </BlogQuote>

            <div className="blogpost-paragraph col-12">
                <p>
                    Campbell described 17 stages of the Monomyth, divided in three parts. First comes the <b>Departure</b>, where the hero (unwillingly) leaves the ordinary world to embark on an adventure, accompanied by a mentor. 
                    Then comes the <b>Initiation</b> where the hero enters the unknown world and faces trials and tasks, alone or with help from allies.
                    Eventually the hero reaches the central crisis of his adventure, where he overcomes the main enemy, undergoes <i>apotheosis</i> and gains his reward.
                    Finally the hero must <b>Return</b> with his reward.
                </p>
            </div>

            <div className='blogpost-image-container'>
                <img src={images('./blog_assets/faldara.jpg')} alt="The party reaching Fal Dara"/>
                <p>
                    The party enterse Fal Dara after having gone through the Ways. This will be their final rest before going through the Ordeal. <a href="https://i.imgur.com/gzkjP6p.jpg">Image source</a> by Lightwaved.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    The term "The Hero's Journey" was popularised later, originating from a documentary about Campbell's work. 
                    Not every story needs to have these exact 17 stages, some only focus on parts of them or have them in slightly different order. 
                    Below I have filled in an adaptation of the Monomyth with 12 stages by <a href="https://en.wikipedia.org/wiki/Christopher_Vogler">Cristoph Vogler</a> focusing on Rand, although it is mostly the same for all of the three ta’veren. 
                    This is only my interpretation, there is not one right answer for this.
                    <BlogSidenote>
                        Another possible categorisation is to move the call to adventure to the more literal call for Rand to leave Emond’s Field and go on an adventure. This makes the refusal of the call more literal as well, Rand does not want to leave his father. It would mean, however, that Meeting the Mentor is out of order.
                    </BlogSidenote>
                    <BlogSidenote spoiler>
                        There are more instances of subplots in the Wheel of Time fitting the Hero’s Journey. Rand’s entire journey throughout all the books is another example where the journey is his mental and spiritual journey in becoming the Dragon Reborn, Perrin’s subplot in The Shadow Rising is another one, and there probably are more!
                    </BlogSidenote>
                </p>

                <table>
                    <tr>
                        <th>Stage</th>
                        <th>Description</th>
                    </tr>
                    <tr>
                        <td>Ordinary World</td>
                        <td>Rand’s life on his farm with his father.</td>
                    </tr>
                    <tr>
                        <td>Call to Adventure</td>
                        <td>While walking to Emond’s Field, Rand sees a fade. <BlogSidenote> Note that the call to adventure is not necessarily a real call, it is a disruption of the status quo of the ordinary world. </BlogSidenote></td>
                    </tr>
                    <tr>
                        <td>Refusal of the Call</td>
                        <td>Rand and the other boys decide to keep them seeing the fade a secret.</td>
                    </tr>
                    <tr>
                        <td>Meeting the Mentor</td>
                        <td>Rand meets Moiraine and she gives him a coin.</td>
                    </tr>
                    <tr>
                        <td>Crossing the First Threshold</td>
                        <td>Rand leaves Emond’s field and the adventure truly begins.</td>
                    </tr>
                    <tr>
                        <td>Tests, Allies, Enemies</td>
                        <td>Along the way to Tar Valon Rand and the others are tested time after time, they meet allies (e.g. Min, Loial) and enemies (Shadowspawn, darkfriends).</td>
                    </tr>
                    <tr>
                        <td>Approach to the Inmost Cave</td>
                        <td>After reuniting in Caemlyn, the party decides to go through the Ways and the Blight to the Eye of the World.</td>
                    </tr>
                    <tr>
                        <td>Ordeal</td>
                        <td>In the blight the travelers become more and more desperate and all seems to go wrong.</td>
                    </tr>
                    <tr>
                        <td>Reward</td>
                        <td>Until their need becomes great enough and they finally find the Eye of the World just in time.</td>
                    </tr>
                    <tr>
                        <td>The Road Back</td>
                        <td>However, we are not done yet! Aginor and Balthamel have returned from their prison.</td>
                    </tr>
                    <tr>
                        <td>Resurrection</td>
                        <td>The party is tested once more in the Eye. They fight and defeat Aginor and Balthamel with the help of the Green Man, finding the Horn of Valere at the bottom of the Eye.</td>
                    </tr>
                    <tr>
                        <td>Return with the Elixir</td>
                        <td>They return to Fal Dara with the Horn.</td>
                    </tr>
                </table>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    The Hero's Journey is not the only tool you could use to analyse why the book works as well as it does. 
                    Another template that works very well in this particular case is Blake Snyder's <a href="http://www.savethecat.com/wp-content/uploads/2013/12/STC_WrkShopTransChartRev2.pdf">three-act structure</a>, which is applied on The Eye of the World <a href="https://www.tor.com/2016/01/25/book-narrative-chart-for-the-wheel-of-time-shows-why-the-series-is-so-appealing/">here</a> by Chris Lough.
                </p>
            </div>

            <div className="blogpost-paragraph col-12">
                <h2>Conclusion</h2>
            </div>

            <div className="blogpost-paragraph col-12">
                <p>
                    The Wheel of Time, and within it The Eye of the World, has deep roots in psychology and mythology 
                    and uses this to tell an interesting story, about characters you care about. 
                    In this post I only talked about the inspiration and background for the characters, their archetypes and the plot. 
                    There is of course much more to writing a gripping book than just taking some archetypes and a template for a plot. 
                    For some extra insight in how to actually write something that people find interesting, 
                    Brandon Sanderson has uploaded a <a href="https://www.youtube.com/playlist?list=PLSH_xM-KC3Zv-79sVZTTj-YA6IAqh8qeQ">series of lectures</a> about writing science fiction/fantasy on Youtube 
                    which are very engaging if you are interested in that sort of thing.
                </p>
            </div>
        </div>
    )
}

export default post;