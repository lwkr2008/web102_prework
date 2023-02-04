/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // step1:loop over each item in the data
    for (let i=0;i<games.length;i++) {
        let obj=games[i];
        console.log(obj.name+':'+i);
        // step2:
        // create a new div element, which will become the game card
        let div_gameCard_Div=document.createElement('div');
        // add the class game-card to the list
        div_gameCard_Div.classList.add('game-card');
        // step3:
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        const display=`
            <div>
                <img src=${obj.img} width="100%" height=100%"/>
                <h2>Name: ${obj.name}</h2>
                <p>${obj.description}</p>
                <p>Backers: ${obj.backers}</p>
            </div>
        `;
        div_gameCard_Div.innerHTML=display;
        // step4:
        // append the game to the games-container
        gamesContainer.append(div_gameCard_Div);
    }
        

}
// step4:
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// step 1:
// use reduce() to count the number of total contributions by summing the backers
// set the inner HTML using a template literal and toLocaleString to get a number with commas
const totalBackers=GAMES_JSON.reduce((accumulator,currentValue)=>accumulator+currentValue.backers,0);
contributionsCard.innerHTML=`${totalBackers.toLocaleString('en-US')}`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised=GAMES_JSON.reduce((accumulator,currentValue)=>accumulator+currentValue.pledged,0)
// set inner HTML using template literal
raisedCard.innerHTML=`${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML=`${GAMES_JSON.length.toLocaleString('en-US')}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames=GAMES_JSON.filter(game=>game.goal>game.pledged);
    console.log("Step1 shows games whose amount raised is less than the goal amount:"+listOfUnfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedOnlyGames=GAMES_JSON.filter(game=>game.goal<=game.pledged);
    console.log("Step2 shows games whose amount raised is greater than or equal to their goal amount:"+listOfFundedOnlyGames.length);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedOnlyGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let countOfunFundedOnlyGames=GAMES_JSON.filter(game=>game.goal>game.pledged).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr=`A total ${totalRaised.toLocaleString('en-US')} of has been raised for ${GAMES_JSON.length.toLocaleString('en-US')} games; Currently, ${countOfunFundedOnlyGames.toLocaleString('en-US')} ${countOfunFundedOnlyGames.length==1?"game remains":"games remain"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
//deleteChildElements(descriptionContainer);
let p_template =document.createElement('p');
p_template.innerHTML=displayStr;
descriptionContainer.append(p_template);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...others]=sortedGames;
console.log("First Game is: "+firstGame.name);
console.log("Second Game is: "+secondGame.name);
// create a new element to hold the name of the top pledge game, then append it to the correct element
//let h2_FirstGame =document.createElement('h2');
//let h2_SecondGame =document.createElement('h2');
//h2_FirstGame.innerHTML=`${firstGame.name}`;
//h2_SecondGame.innerHTML=`${secondGame.name}`;
//firstGameContainer.append(h2_FirstGame);
//secondGameContainer.append(h2_SecondGame);
firstGameContainer.append(`${firstGame.name}`);
secondGameContainer.append(`${secondGame.name}`);
// do the same for the runner up item

//optional Most popular games
const popularBtn = document.getElementById("popular-btn");
// show all games
function showPopularGames() {
    deleteChildElements(gamesContainer);
    let sortedPopularGames =  GAMES_JSON.sort( (item1, item2) => {
        return item2.backers - item1.backers;
    });
    addGamesToPage(sortedPopularGames);
}
popularBtn.addEventListener("click",showPopularGames);