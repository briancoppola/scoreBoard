console.log('loaded scoreBoard.js');

var header = document.querySelector('header');

var player1 = document.querySelector('.player1');
var player2 = document.querySelector('.player2');

var player1Total = document.querySelector('.player1 .total');
var player2Total = document.querySelector('.player2 .total');

var player1Add = document.querySelector('.player1 .add');
var player2Add = document.querySelector('.player2 .add');

var player1Input = document.querySelector('.player1 input');
var player2Input = document.querySelector('.player2 input');

var player1ScoreList = document.querySelector('.player1 ul');
var player2ScoreList = document.querySelector('.player2 ul');

header.addEventListener('click', reset, false);

function Player() {
  this.scores = [],
  this.total = 0,
  this.add = function() {
    console.log('add');
  }
}

var p1 = new Player();

var player1Scores = [];
var player2Scores = [];

player1Add.addEventListener('click', addPlayer1Score, false);
player2Add.addEventListener('click', addPlayer2Score, false);

function addPlayer1Score() {
  player1Scores.push( Number(player1Input.value) );
  if (player1Scores !== "" && player1Scores !== NaN) {

    // wipe the html clean before re-rendering
    player1ScoreList.innerHTML = '';

    // render the scores and rounds to html
    player1Scores.forEach( function(score, index) {

      var deleteBox = document.createElement('span');
      deleteBox.innerHTML = '&times;'
      deleteBox.className = 'delete'

      // create span for the round number and add 'round' class
      var currentRoundElement = document.createElement('span');
      currentRoundElement.className = 'round';
      // insert the current round number into the element
      currentRoundElement.innerHTML = index + 1;


      // create span for the current score and add 'score' class
      var currentScoreElement = document.createElement('span');
      currentScoreElement.className = 'score';
      currentScoreElement.contenteditable = true;
      // put the current score into the 'score' element
      currentScoreElement.innerHTML = score;

      // create a new list element to house the above two 'round' & 'score'
      var newScoreListItem = document.createElement('li');
      newScoreListItem.addEventListener('click', function(e) {
        if (e.target.className.match(/round/g) && !e.target.parentNode.className.match(/remove/g)) {
          e.target.parentNode.className += ' remove';
        } else if (e.target.className.match(/round/g)) {
          e.target.parentNode.className = 'round';
        } else if (e.target.className.match(/delete/g)) {
          player1ScoreList.removeChild(e.target.parentNode)
          console.log(player1Scores.splice(index, 1));
        }
        console.log(e.target.className);
        var deleteBox = document.createElement('span');
        deleteBox.className = "box delete";

      })

      // bundle the 'round' and 'score' into the new <li> element
      newScoreListItem.appendChild(deleteBox);
      newScoreListItem.appendChild(currentRoundElement);
      newScoreListItem.appendChild(currentScoreElement);

      // append the element to the parent list ul
      player1ScoreList.appendChild(newScoreListItem);



    });

    // clear input field after adding to list
    player1Input.value = "";

    // sum the score
    var total;
    player1Total.innerHTML = "Total: " + player1Scores.reduce(function (a, b) {
      return a + b;
    });

  }
}

function addPlayer2Score() {
  player2Scores.push( Number(player2Input.value) );
  if (player2Scores !== "" && player2Scores !== NaN) {

    // wipe the html clean before re-rendering
    player2ScoreList.innerHTML = '';

    // render the scores and rounds to html
    player2Scores.forEach( function(score, index) {

      // create span for the round number and add 'round' class
      var currentRoundElement = document.createElement('span');
      currentRoundElement.className = 'round';
      // insert the current round number into the element
      currentRoundElement.innerHTML = index + 1;


      // create span for the current score and add 'score' class
      var currentScoreElement = document.createElement('span');
      currentScoreElement.className = 'score';
      // put the current score into the 'score' element
      currentScoreElement.innerHTML = score;

      // create a new list element to house the above two 'round' & 'score'
      var newScoreListItem = document.createElement('li');

      // bundle the 'round' and 'score' into the new <li> element
      newScoreListItem.appendChild(currentRoundElement);
      newScoreListItem.appendChild(currentScoreElement);

      // append the element to the parent list ul
      player2ScoreList.appendChild(newScoreListItem);

    });

    // clear input field after adding to list
    player2Input.value = "";

    // sum the score
    var total;
    player2Total.innerHTML = "Total: " + player2Scores.reduce(function (a, b) {
      return a + b;
    });

  }
}



function player2sum(newScore) {
  player2stats.total += Number(newScore);
  player2total.innerHTML = "Total: " + player2stats.total;
}

function reset() {
  player1ScoreList.innerHTML = '';
  player1Total.innerHTML = '';
  player1Scores = [];

  player2ScoreList.innerHTML = '';
  player2Total.innerHTML = '';
  player2Scores = [];
}
