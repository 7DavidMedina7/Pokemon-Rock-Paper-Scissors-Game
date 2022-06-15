// Creating a 'database' with all the game information
rpsGameDatabase = {
    'squirtle': {'squirtle': 0.5, 'charmander': 1, 'bulbasaur': 0},
    'charmander': {'squirtle': 0, 'charmander': 0.5, 'bulbasaur': 1},
    'bulbasaur': {'squirtle': 1, 'charmander': 0, 'bulbasaur': 0.5},
    'wins': 0,
    'losses': 0,
    'draws': 0
}

// Creating a event listener for the play-again button
document.querySelector('#play-again-button').addEventListener('click', playAgainButton);

// Function that runs the entire game
function rpsGame(selectedOption) {
    
    // Clearing out the results div box 
    clearDiv('results-container-div');

    var userChoice, cpuChoice;
    
    // User and CPU's selected option 
    userChoice = selectedOption.id;
    cpuChoice = cpuSelection();

    // Creating our sounds
    var squirtle_cry = new Audio("/static/sounds/squirtle_cry.mp3");
    var charmander_cry = new Audio("/static/sounds/charmander_cry.mp3");
    var bulbasaur_cry = new Audio("/static/sounds/bulbasaur_cry.mp3");

    // Playing the user's selected Pokemon cry
    if (userChoice == "charmander") {
        charmander_cry.play();
    } else if (userChoice == "squirtle") {
        squirtle_cry.play();
    } else if (userChoice == "bulbasaur") {
        bulbasaur_cry.play();
    }

    // Computing the winner
    results = decideWinner(userChoice, cpuChoice);

    // Determining the output message
    messageOutput = finalMessage(results);

    // Outputting the final decision on the screen
    displayResults(userChoice, cpuChoice, messageOutput);

    console.log("Results: " + results);
    console.log("The user selected: " + userChoice);
    console.log("The CPU selected: " + cpuChoice);
    console.log(messageOutput);
    console.log(rpsGameDatabase);
}

// Function that will decide what the computer selected
function cpuSelection() {
    return ['squirtle', 'charmander', 'bulbasaur'][Math.floor(Math.random() * 3)];
}

// Function that will decide who is the winner
// Array method:
// [0, 1] human lost and cpu won
// [1, 0] human won and cpu lost
// [0.5, 0.5] There is a tie 
function decideWinner(userChoice, cpuChoice) {

    // Computing the results of each player
    var userScore = rpsGameDatabase[userChoice][cpuChoice]; 
    var cpuScore = rpsGameDatabase[cpuChoice][userChoice];

    results = [userScore, cpuScore];

    if (results[0] == 0) {
        rpsGameDatabase['losses']++;
    } else if (results[1] == 0.5) {
        rpsGameDatabase['draws']++;
    } else {
        rpsGameDatabase['wins']++;
    }

    return results;
}

// Helper function that will determine the output message:
function finalMessage(results) {
    if (results[0] == 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (results[1] == 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function displayResults(userImageChoice, cpuImageChoice, messageOutput) {
    var imageDatabase = {
        'squirtle': document.getElementById('squirtle').src,
        'charmander': document.getElementById('charmander').src,
        'bulbasaur': document.getElementById('bulbasaur').src
    }

    // Creating our output images and message
    var userDiv = document.createElement('div');
    var cpuDiv = document.createElement('div');
    var messageDiv = document.createElement('div');


    console.log(messageOutput['color']);
    console.log(messageOutput['message']);

    userDiv.innerHTML = "<img src='" + imageDatabase[userImageChoice] + "' height=300 width=300>";
    cpuDiv.innerHTML = "<img src='" + imageDatabase[cpuImageChoice] + "' height=300 width=300>";
    messageDiv.innerHTML = "<h1 style='color: " + messageOutput['color'] + "; font-size: 60px; padding: 30px;'>" + messageOutput['message'] + "</h1>";
    console.log("messageDiv: " + messageDiv);

    // Appending both player's image selection and final message
    document.getElementById('results-container-div').appendChild(userDiv);
    document.getElementById('results-container-div').appendChild(messageDiv);
    document.getElementById('results-container-div').appendChild(cpuDiv);

    // Updating the table with the new statistics
    document.querySelector('#win-count').textContent = rpsGameDatabase['wins'];
    document.querySelector('#loss-count').textContent = rpsGameDatabase['losses'];
    document.querySelector('#draw-count').textContent = rpsGameDatabase['draws'];
    
}

// Function that clear out an entire DIV
function clearDiv(elementID) {
    var div = document.getElementById(elementID);

    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}