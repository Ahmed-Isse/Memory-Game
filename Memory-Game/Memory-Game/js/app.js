///*
// * Create a variables that holds all of your cards, stars, cards on deck, success pairs, totalTime, recordtime, recordmove, startTime and number of moves.
// */
let allCards = document.querySelectorAll('.card');
let stars = document.querySelector('.stars').querySelectorAll('li');
let caption = "Total Minutes Played: ";
let starCount;
let successPairs = 1;
let moves = 0;
let cardOnDeck = [];
let startTime = performance.now();
let totalTime = 0;
let recordtime = 0;
let recordmove = 0;


/*
 * Shuffle the Card with Repeat Click
 */
let shuffleCards = document.querySelector('.fa-repeat');
shuffleCards.addEventListener('click', function(){
    // Reset All
    ResetAll();
});

function ResetAll() {
    setTimeout(function () {

        // Hide all Cards
        HideCards(allCards);

        // convert them to array
        var items = Array.from(allCards);

        // Shuffle Cards
        allCards = shuffle(items);

        // Add cards to Document.
        AddCards(allCards);

    }, 100);

    // Reset the success and moves, and time Counters
    successPairs = 1;
    moves = 0;
    startTime = performance.now();

    // Reset moves;
    IncrementMoves(moves);
}

function HideCards(allCards) {
    allCards.forEach(function (card) {
        card.classList.remove('open', 'show', 'visited', 'match');
        card.style.backgroundColor = '';

        if (card.children[0].classList.contains('fa-anchor')) {
            card.classList.add('match');
        }
    });
}

function RecalculateNumOfStars(move) {

    setTimeout(function () {
        
        // calculate the number of stars to be given.
        if (move == 1) {
            starCount = 3;
            ShowStars(starCount);
        }
        else if (move == 11) {
            starCount = 2;
            ShowStars(starCount);
        }
        else if (move == 16) {
            starCount = 1;
            ShowStars(starCount);;
        }
        else if (move == 21) {
            starCount = 0;
            HideStars(3);
        }

    }, 1000);
}

/*
    Show stars given a number.
*/
function ShowStars(numOfStars) {
    // First call hide to remove all stars.
    HideStars(3);

    for (let i = 0; i < numOfStars; i++) {
        if (stars[i].childNodes[0].classList.contains('hidden'))
        {
            stars[i].childNodes[0].classList.remove('hidden');
        }
        stars[i].childNodes[0].classList.add('show');
    }
}

/*
    Hides stars given a number.
*/
function HideStars(numOfStars) {
    
    for (let i = 0; i < numOfStars; i++) {
        if (stars[i].childNodes[0].classList.contains('show')) {
            stars[i].childNodes[0].classList.remove('show');
        }
        stars[i].childNodes[0].classList.add('hidden');
    }
}

/*
    Adds cards to Deck
*/
function AddCards(allCards) {
    const fragment = document.querySelector('.deck');
    for(let i =0; i < allCards.length; i++)
    {
        fragment.appendChild(allCards[i]);
    }
}

/*
    Shuffle an Array
*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
    In case a card is clicked.
*/
allCards.forEach(function (card) {
    
    card.addEventListener('click', function (event) {

        if (!card.classList.contains("match")) {
            CheckCard(card);
        }
    });
});

/*
    Compute what should happen when a card is clicked.
*/
function CheckCard(card) {
    if(cardOnDeck.length == 1)
    {
        if (!card.classList.contains('visited')) {
            // Add card to deck variable and open/show class to card
            cardOnDeck.push(card);
            card.classList.add('open', 'show');

            // Increment moves Counter and do some calculation for stars shown.;
            moves += 1;
            IncrementMoves(moves);
            RecalculateNumOfStars(moves)

            // Check the value of cardOnDeck
            if (cardOnDeck[0].children[0].className === cardOnDeck[1].children[0].className) {
                Match();
                successPairs += 1;

                if (successPairs == 8) {
                    Success(successPairs);
                }
            }
            else {
                //in a NonMatch, change the style to Orange temporarly.
                cardOnDeck[0].classList.add('nonmatch');
                cardOnDeck[1].classList.add('nonmatch');

                NonMatch();
            }
        }
        else {
            // Card has already visited class. Dont do anything.
        }
    }
    else if (cardOnDeck.length == 0) {
        if (!card.classList.contains('show')) {
            cardOnDeck.push(card);
            card.classList.add('open', 'show', 'visited');
        }
    }
}

/*
    In case of Pairs clicked not matching.
*/
function NonMatch(card) {
    setTimeout(function () {
        cardOnDeck.forEach(function (card) {
            card.classList.remove('open', 'show', 'visited', 'nonmatch');

            // remove the syle
            card.style.backgroundColor = "";
        });

        // set cardOnDeck to empty.
        cardOnDeck = [];
    }, 500);
}

/*
    In case of Pairs clicked matching.
*/
function Match() {
    setTimeout(function () {
        cardOnDeck.forEach(function (card) {
            card.classList.add("match");
        });

        cardOnDeck = [];
    }, 500);
}

/*
    In case of when all pairs are Matched.
*/
function Success(successPairs) {
    setTimeout(function () {
        // Hide main Game container
        document.getElementById('game').style.display = "none";

        // Show number of moves and stars.
        document.querySelector('.movenum').textContent = moves;
        document.querySelector('.starnum').textContent = starCount;

        // show success container
        document.getElementById('success').style.display = "initial";
        
        // Get the current time.
        let endTime = performance.now();
        totalTime = endTime - startTime;
        
        let totalCaption = document.querySelector('.endtotaltime');
        totalCaption.textContent = caption.concat(MillisecondToMinuteAndSecond(totalTime), " seconds.");

        // Show Current Record time/move.
        ShowRecord();
        successPairs = 1;

    }, 500);
}

/*
    Show Record Time/Move.
*/
function ShowRecord() {
    let timeRecordcaption = document.querySelector('.recordtime');
    let moveRecordcaption = document.querySelector('.recordmove');

    // change recordmove if current move is less.
    if (moves < recordmove || recordmove === 0) {
        recordmove = moves;
    }

    // change recordtime if current totaltime is less.
    if (totalTime < recordtime || recordtime === 0) {
        recordtime = totalTime;
    }

    timeRecordcaption.textContent = MillisecondToMinuteAndSecond(recordtime);
    moveRecordcaption.textContent = recordmove;
}

/*
    Convert Millisecond to Minutes and seconds
*/
function MillisecondToMinuteAndSecond(millisecond) {
    let minutes = Math.floor(millisecond / 60000);
    let seconds = ((millisecond % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

/*
    reverse the container shown when user clicks the success button
*/
let successbutton = document.getElementById('btnokay');
successbutton.addEventListener('click', function () {
    // Show main Game container
    document.getElementById('game').style.display = "flex";

    // Hide success container
    document.getElementById('success').style.display = "none";

    // Reset the Game
    ResetAll();

    // Reset Stars to 3.
    ShowStars(3);
});

/*
    Increment move variable and show it on the page.
*/
function IncrementMoves(moves){
    let shownMoves = document.querySelector('.moves');
    shownMoves.textContent = moves;
}

/* 
    Start Clock Time when Game loads.
*/
function ClockTime() {
    let today = new Date();
    let timeSpan = ""
    let timeCaption = 'Current Time:';
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    
    let currentTime = document.querySelector('.clock');
    currentTime.textContent = timeCaption.concat(hour, ":", minutes, ":", seconds);

    var time = setTimeout(ClockTime, 300);
}