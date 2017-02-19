console.log('loaded scoreBoard.js');

var header = document.querySelector('header');

var player1 = document.querySelector('.player1');
var player2 = document.querySelector('.player2');

var player1total = document.querySelector('.player1 .total');
var player2total = document.querySelector('.player2 .total');

var player1add = document.querySelector('.player1 .add');
var player2add = document.querySelector('.player2 .add');

var player1input = document.querySelector('.player1 input');
var player2input = document.querySelector('.player2 input');

var player1scores = document.querySelector('.player1 ul');
var player2scores = document.querySelector('.player2 ul');

header.addEventListener('click', reset, false);

var player1stats = {
  score: 0,
  total: 0,
  round: 0 // bumped up to 1 on the first go
}
var player2stats = {
  score: 0,
  total: 0,
  round: 0
}

player1add.addEventListener('click', addPlayer1Score, false);
player2add.addEventListener('click', addPlayer2Score, false);

function addPlayer1Score() {
  player1stats.score = Number(player1input.value);
  if (player1stats.score !== "" && player1stats.score !== NaN) {

    // update round
    player1stats.round += 1;

    // create span for the round number and add 'round' class
    var currentRoundElement = document.createElement('span');
    currentRoundElement.className = 'round';
    // insert the current round number into the element
    currentRoundElement.innerHTML = player1stats.round;

    // create span for the current score and add 'score' class
    var currentScoreElement = document.createElement('span');
    currentScoreElement.className = 'score';
    // put the current score into the 'score' element
    currentScoreElement.innerHTML = player1stats.score;

    // create a new list element to house the above two 'round' & 'score'
    var newScoreListItem = document.createElement('li');

    // append 'round' and 'score' to the new list element
    newScoreListItem.appendChild(currentRoundElement);
    newScoreListItem.appendChild(currentScoreElement);

    // append the element to the parent list ul
    player1scores.appendChild(newScoreListItem);

    // clear input field after adding to list
    player1input.value = "";

    // sum the score
    player1stats.total += Number(player1stats.score);
    player1total.innerHTML = "Total: " + player1stats.total;


  }
}

function addPlayer2Score() {
  player2stats.score = Number(player2input.value);
  if (player2stats.score !== "") {

    // update round
    player2stats.round += 1;

    // create span for the round number and add 'round' class
    var currentRoundElement = document.createElement('span');
    currentRoundElement.className = 'round';
    // insert the current round number into the element
    currentRoundElement.innerHTML = player2stats.round;

    // create span for the current score and add 'score' class
    var currentScoreElement = document.createElement('span');
    currentScoreElement.className = 'score';
    // put the current score into the 'score' element
    currentScoreElement.innerHTML = player2stats.score;

    // create a new list element to house the above two 'round' & 'score'
    var newScoreListItem = document.createElement('li');

    // append 'round' and 'score' to the new list element
    newScoreListItem.appendChild(currentRoundElement);
    newScoreListItem.appendChild(currentScoreElement);

    // append the element to the parent list ul
    player2scores.appendChild(newScoreListItem);

    // clear input field after adding to list
    player2input.value = "";

    // sum the score
    player2stats.total += Number(player2stats.score);
    player2total.innerHTML = "Total: " + player2stats.total;


  }
}

function player2sum(newScore) {
  player2stats.total += Number(newScore);
  player2total.innerHTML = "Total: " + player2stats.total;
}

function reset() {
  console.log('reset');
}
