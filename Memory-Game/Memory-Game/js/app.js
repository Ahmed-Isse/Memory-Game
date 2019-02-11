///*
// * Create a list that holds all of your cards
// */
let allCards = document.querySelectorAll('.card');
let successPairs = 1;
let cardOnDeck = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let shuffleCards = document.querySelector('.fa-repeat');
shuffleCards.addEventListener('click', function(){
    console.log('Shuffle event Click has been fired.');

    // Reset All
    ResetAll();
});

// Call Onload Event.
//window.onload = ResetAll;

function ResetAll() {
    console.log('form load fired.');
    // Reset the success Counter.
    successPairs = 1;

    setTimeout(function () {

        // Hide all Cards
        HideCards(allCards);

        // convert them to array
        console.log(...allCards);
        var items = Array.from(allCards);

        // Shuffle Cards
        allCards = shuffle(items);
        console.log(...allCards);

        // Remove cards from Document.
        RemoveCards(allCards);

        // Add cards to Document.
        AddCards(allCards);

    });
}

function RemoveCards(allCards) {
    const deck = document.querySelector('.deck');

        console.log(`Cards count is ${deck.childElementCount}`);
        while (deck.firstChild) {
            deck.removeChild(deck.firstChild);
        }
}

function AddCards(allCards) {
    //const fragment = document.createDocumentFragment();
    const fragment = document.querySelector('.deck');
    for(let i =0; i < allCards.length; i++)
    {
        fragment.appendChild(allCards[i]);
    }

    //document.body.appendChild(fragment);
}

function HideCards(allCards) {
    console.log('HideCards function has been fired.');
    allCards.forEach(function (card) {
        card.classList.remove('open', 'show');
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    console.log('Shuffle array function has been fired.');
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
allCards.forEach(function (card) {
    card.addEventListener('click', function (event) {
        console.log("Card has been Clicked.")

        console.log("Calling CheckCard Function.")
        CheckCard(card);
    });
});

function CheckCard(card) {
    
    if(cardOnDeck.length >= 1)
    {
        cardOnDeck.push(card);
        console.log(`cardOnDeck lengh is: ${cardOnDeck.length}.`)
	
        card.classList.add('open', 'show');

        // Test
        cardOnDeck.forEach(function(card){
            console.log(card.className);
        });
        console.log("Timeout Fired.")
        // End test

        // Check the value of cardOnDeck
        let first = cardOnDeck[0].children[0].className;
        let second = cardOnDeck[1].children[0].className;
        if(first === second)

        {
            console.log("True");
            cardOnDeck = [];
            successPairs += 1;

            if(successPairs == 8)
            {
                console.log("Number of success count is:" + successPairs)
                setTimeout(function () {
                    alert("You won! Whooooooo... \nwhat a move", "Conguratulations");
                    successPairs = 1;
                    ResetAll();
                }, 500);
            }
        }

        else
        {
            console.log("False");
            setTimeout(function(){
                cardOnDeck.forEach(function(card){
                    card.classList.remove('open', 'show');
                });
                console.log("Timeout Fired.")
                cardOnDeck = []; 
            }, 1000);
        }
            
    }
    else {
        cardOnDeck.push(card);
        console.log(`First Card. Adding Open and Show classes.`)
        console.log(`cardOnDeck lengh is: ${cardOnDeck.length}.`)
        card.classList.add('open', 'show');
    }
}
