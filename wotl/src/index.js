import React from 'react';
import ReactDOM from 'react-dom';
import {useRoutes} from 'hookrouter';
import ReactGA from 'react-ga';

import './fonts/HyliaSerifBeta-Regular.otf'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import './styles/burger-styles.scss';

import Map from './js/map/Map.js';
import ScoreQuiz from './js/quizzes/ScoreQuiz.js';
import PersonalityQuiz from './js/quizzes/PersonalityQuiz.js';
import DropQuiz from './js/quizzes/DropQuiz.js'
import QuizCollection from './js/quizzes/QuizCollection.js'
import NotFoundPage from './js/NotFoundPage.js'
import Home from './js/Home.js'
import Blog from './js/blog/Blog.js'
import BlogPost from './js/blog/BlogPost.js'
import Page from './js/Page.js'
import TimelinePage from './js/timeline/TimelinePage.js'

/*
TODO: 

--- Met prioriteit ---


- heeeele rare bug: als je timeline closet, dan een locatie opent, dan de locatie sluit, 
  dan kan je niet meer de map bewegen totdat je de timeline opent en naar een ander event gaat


- op mobiel werkt de timeline navigator niet goed doordat de table groter is dan het scherm en dat wordt niet goed gedetecteerd ofzo?
snap het niet helemaal

- legenda voor de routes

- onderzoeken of de low def versie vd kaart wel echt sneller is

- paths 11+
    - als ik hiermee bij boek 14 ben, ook even de people vd events checken want daar ben ik niet helemaal zeker van


--- zonder prioriteit ---

- blogimage component maken

- blogs beter opslaan, neit handmatig een array moeten maken in index.js en kopieren in Home.js

- location niet showen on drag

- verander map timeline en locationcontainer mouseover and mouseleave functies zodat de naam duidelijker is, nu zegt ie ook mouseovertimeline als de timeline er niet is

- doe bij map een aparte click handler die getposition en locationtoname doet ipv locationtoname bij getposition

- stipjes zien er nu soms raar uit bij de paths

- animate map movement ook als konva animation doen misschien? dan kan het miss lineair ipv met sigmoid

- beginnen bij event andesr dan 0 gaat nog niet goed voor de lijnen

- konva Animation gebruiken voor het begwen vd portraits

- Forel Market op de kaart

- Braem wood tekst op de kaart

- hiding timeline then you can scroll out of the map nd see only grey

- dependencies uitbreiden zodat het ook goed gaat als er nog meer dan 1 path gedaan moet worden door een andere groep

- iets i het midden vd portraits toevoegen misschien, kijken hoe het eruit ziet als ze er allemaal zijn

- beginlocaties vd portraits goed doen

- pathmanager oid toevoegen vergelijkbaar met PortraitManager want MAp,js wordt te gigantisch

- extra patreon ranks

- custom message bij het sharen v quiz zodat je ziet hoeveel je er goed had als je hem deelt

- eerst checken of mail al in de database staat voordat ie erbij komt

- link naar vorige / volgende blogpost bij een blogpost, kan aps als ik er meer dan 1 heb

- sub-title bij de quizzes?

- de quiz result container gebruikt de share icons van het menu, maak generiek component voor share dingen en gebruik die voor allebei.

- on hover bij de map image o home en bij de quiz previews de schaduw sterker

- css classes beter doen zodat ze vaker herhaald kunnen worden ipv veel code herhaaldelijk doen

- open vraag quiz maken, hoeveel karakters kan je noemen (kan ook blog post over met NLP dingen)

- spoiler warnings per quiz, dan ook de filters in het menu doen buiten de map?
    - dan ook de links vh mnu een eigen componenet maken, en de filters, zodat dat niet allemaal dubbel moet bij map en main menu



*/

import triviaNovice from './quizzes/trivia-novice.json';
//import triviaChocolate from './quizzes/trivia-chocolate.json';
import triviaAccepted from './quizzes/trivia-accepted.json';
import triviaAesSedai from './quizzes/trivia-aessedai.json';
//import aielWaste from './quizzes/aiel-waste.json';
import whosaidit from './quizzes/whosaidit.json';
import whichForsaken from './quizzes/which-forsaken-are-you.json';
import dropNation from './quizzes/drop-nations.json' ;

import firstBlog from './blogs/first-blog.jsx';
import makingBlog from './blogs/making-map-blog.jsx';
import eotwBlog from './blogs/why-eotw-works.jsx';

let blogposts = [
    {
        title: "Why The Eye of the World Works",
        titleImage: "blog_assets/green-mans-garden.jpg",
        titleImageCredit: "https://i.imgur.com/tpEMJ57.jpg",
        titleImageArtist: "Lightwaved",
        date: "5/22/2020",
        previewText: "If you are reading this, then it is fair to assume that you have read The Eye of the World, and ... ",
        post: eotwBlog
    },
    {
        title: "Making of a Map",
        titleImage: "blog_assets/Map-LD.jpg",
        titleImageCredit: "/map",
        titleImageArtist: "me",
        date: "3/10/2020",
        previewText: "I want to start this blog by thanking everyone who visited the site, answered the poll and a special thanks to the patrons ... ",
        post: makingBlog
    },
    {
        title: "It Was Not The Beginning, But It Was A Beginning",
        titleImage: "01-The-Eye-of-the-World-outside-640x470.jpg",
        titleImageCredit: "https://cdn.arstechnica.net/wp-content/uploads/2016/04/01-The-Eye-of-the-World-outside-640x470.jpg",
        titleImageArtist: "Darrell K. Sweet",
        date: "2/16/2020",
        previewText: "Like many Wheel of Time fans I was very excited when Amazon announced the Wheel of Time show ... ",
        post: firstBlog
    }
]

let quizzes = [dropNation, whosaidit, whichForsaken, triviaNovice, triviaAccepted, triviaAesSedai];

ReactGA.initialize('UA-72578995-3');


const routes = {
    "/": () => <Page title="Wheel of Timelines" description="Wheel of Timelines - The best Wheel of time map with timeline, plus quizzes and a blog!" element={<Home />} />,
    "/blog": () => <Page title="Wheel of Timelines - Blog" description="Wheel of Timelines - The best Wheel of time map with timeline, plus quizzes and a blog!" element={<Blog posts={blogposts}/>} />,
    "/quizzes": () => <Page title="Wheel of Timelines - Quizzes" description="Wheel of Timelines - The best Wheel of time map with timeline, plus quizzes and a blog!" element={<QuizCollection quizzes={quizzes} />} />,
    "/map": () => <Map />,
    "/timeline": () => <Page title="Wheel of Timelines - Timeline" description="Wheel of Timelines - The best Wheel of time map with timeline, plus quizzes and a blog!" element={<TimelinePage />} />
};

for (let i = 0; i < quizzes.length; i++) {
    let link = '/quizzes/' + quizzes[i].title.replace(/ /g, "_");
    quizzes[i].link = link
    if (quizzes[i].type === "score") {
        routes[link] = () => 
            <Page 
                title={quizzes[i].title} 
                description = {quizzes[i].title} 
                element={<ScoreQuiz data={quizzes[i]}/>} 
            />
    }
    else if (quizzes[i].type === "personality") {
        routes[link] = () => 
            <Page 
                title={quizzes[i].title} 
                description = {quizzes[i].title}
                element={<PersonalityQuiz data={quizzes[i]}/>} 
            />
    }
    else if (quizzes[i].type === "drop") {
        routes[link] = () => 
            <Page 
                title={quizzes[i].title} 
                description = {quizzes[i].title}
                element={<DropQuiz data={quizzes[i]}/>} 
            />
    }
    
}

for (let i = 0; i < blogposts.length; i++) {
    let link = '/blog/' + blogposts[i].title.replace(/ /g, "_");
    blogposts[i].link = link
    routes[link] = () => <Page title={"Wheel of Timelines - " + blogposts[i].title} 
                               description="A Blog post from Wheel of Timelines - The best Wheel of time map with timeline, plus quizzes and a blog!"
                               element={<BlogPost data={blogposts[i]}/>}
                          />
}

const RouteManager = () => {
    const routeResult = useRoutes(routes);
    
    ReactGA.pageview(window.location.pathname + window.location.search)

    return routeResult || <NotFoundPage />;
}

ReactDOM.render(<RouteManager />, document.getElementById('root'));
