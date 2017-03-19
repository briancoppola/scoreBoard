console.log('loaded scoreBoard.js');

var app = document.querySelector('.app');
var stage = document.querySelector('.stage');
var header = document.querySelector('header');
var addPlayerButton = document.querySelector('.add-player');
var removePlayerButton = document.querySelector('.remove-player');
var players = [];

var xDown = null,
    yDown = null;

function handleTouchStart(event) {
  console.log(event);
  xDown = event.touches[0].clientX;
  yDown = event.touches[0].clientY;
  console.log(xDown, yDown);
}

function handleTouchMove(e) {
  // console.log(e.touches);
  if (!xDown || !yDown) {
    return; // do nothing if we have no values
  }

  var xUp = e.touches[0].clientX;
  var yUp = e.touches[0].clientY;

  var xDelta = xDown - xUp;
  var yDelta = yDown - yUp;

  if (Math.abs(xDelta) > Math.abs(yDelta)) {
    if (xDelta > 0) {
      console.log(e.target.parentNode, 'left')
      e.target.parentNode.className = 'round-wrap delete-active';
    } else {
      console.log('right')
      e.target.parentNode.className = 'round-wrap';
    }
  } else {
    if (yDelta > 0) {
      console.log(e.target, 'up')
    } else {
      console.log('down')
    }
  }

  // reset
  xDown = null;
  yDown = null;
}


var previousScroll = 0;
window.addEventListener('scroll', function(e) {
  var currentScroll = window.pageYOffset;
  if (window.pageYOffset > players[0].elements.playerHeading.scrollHeight - players[0].elements.inputWrap.scrollHeight && currentScroll > previousScroll) {
    players.forEach(function(player) {
      player.elements.playerHeading.className = 'name squish';
    });
  } else if (window.pageYOffset < players[0].elements.playerHeading.scrollHeight - players[0].elements.inputWrap.scrollHeight && currentScroll < previousScroll) {
    players.forEach(function(player) {
      player.elements.playerHeading.className = 'name';
    })
  }
  previousScroll = currentScroll;
});


removePlayerButton.addEventListener('click', removePlayer);
addPlayerButton.addEventListener('click', pushPlayer);

function pushPlayer(playerName) {
  var args = Array.prototype.slice.apply(arguments);
  console.log(args);
  args = args.slice(1);
  console.log(args);
  if (players.length <= 3) { // only 4 players max
    players.push(new Player(playerName));
    players.forEach(function(player) {
      player.initialise();
    })
  }
}

function removePlayer() {
  if (players.length > 1) { // at least 1 player
    players[players.length - 1].erase();
    players.splice(-1, 1);
  }
}

function randomEmoji() {
  return 1;
}
console.log(randomEmoji());

function Player(playerName) {
  this.scores = [],
  this.total = 0,
  this.name = playerName ? playerName : 'P' + Math.floor(Math.random() * 99),
  this.elements = {
    playerWrap: document.createElement('section'),
    playerHeading: document.createElement('h2'),
    playerTitle: document.createElement('span'),
    inputWrap: document.createElement('div'),
    scoreInput: document.createElement('input'),
    addButton: document.createElement('button'),
    scores: document.createElement('ul'),
    total: document.createElement('div')
  },
  this.initialise = function() {
    this.prepareElements();
    this.appendElements();
    this.refresh();
  },
  this.prepareElements = function () {
    // add appropriate classes to each element
    this.elements.playerWrap.className = 'player' + ' ' + this.name;
    this.elements.playerHeading.className = 'name';
    this.elements.playerTitle.className = 'title';
    this.elements.inputWrap.className = 'input-wrap';
    this.elements.scoreInput.className = 'score-input';
    this.elements.addButton.className = 'add';
    this.elements.scores.className = 'scores';
    this.elements.total.className = 'total';

    // add custom attributes where necessary
    this.elements.playerTitle.innerHTML = this.name;
    this.elements.playerTitle.contentEditable = true;

    this.elements.addButton.innerHTML = '+';
    this.elements.addButton.addEventListener('click', this.addToScores.bind(this), false); // bind 'this' to the outer Player object
    this.elements.scoreInput.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        this.addToScores();
      }
    }.bind(this), false); // bind 'this' to the outer Player object

    this.elements.scoreInput.type = 'number';
    this.elements.scoreInput.pattern = '[0-9]';
  },
  this.appendElements = function() {
    // first nest the appropriate elements into their parents
    // start with smaller components...
    this.elements.playerHeading.appendChild(this.elements.playerTitle);

    this.elements.inputWrap.appendChild(this.elements.scoreInput);
    this.elements.inputWrap.appendChild(this.elements.addButton);

    // ...add smaller components to the main player wrapper
    this.elements.playerWrap.appendChild(this.elements.playerHeading);
    this.elements.playerWrap.appendChild(this.elements.inputWrap);
    this.elements.playerWrap.appendChild(this.elements.scores);
    this.elements.playerWrap.appendChild(this.elements.total);

    // then create a big bundle/staging area to push into the dom
    var bundle = document.createDocumentFragment();
    bundle.appendChild(this.elements.playerWrap);

    // push the bundle into the dom
    stage.appendChild(bundle);
  },
  this.refresh = function() {
    this.clearInputBox();
    this.clearScoresDisplay();
    this.displayScores();
    this.totalScores();
    this.displayTotal();
  },
  this.setName = function() {
    this.elements.playerName.innerHTML = playerName || 'Player';
  },
  this.addToScores = function(apiInput) {
    var guiInput = this.elements.scoreInput.value,
        sanitizedInput;

    // sanitize input to only get numbers
    if ( !isNaN(parseFloat(guiInput)) && isFinite(guiInput) ) {
      sanitizedInput = Number(guiInput);
    } else if ( !isNaN(parseFloat(apiInput)) && isFinite(apiInput) ) {
      sanitizedInput = Number(apiInput);
    }

    // only add score if sanitizedInput exists (i.e. is a number including 0)
    if (sanitizedInput || sanitizedInput === 0) {
      this.scores.push(sanitizedInput);
    }
    this.refresh();
  },
  this.removeScore = function(scoreIndex) {
    this.scores.splice(scoreIndex, 1);
    this.refresh();
  },
  this.totalScores = function() {
    if (this.scores.length > 0) {
      this.total = this.scores.reduce(function(tempTotal, score) {
        return tempTotal + score;
      })
    }
  },
  this.displayTotal = function() {
    if (this.scores.length > 0) {
      this.elements.total.innerHTML = this.total;
    } else {
      this.elements.total.innerHTML = '◽️';
    }
  },
  this.displayScores = function() {
    this.scores.forEach(function(scoreValue, roundValue) {
      // create necessary elements for each score value on display
      var scoreWrap = document.createElement('li'),
          scoreBox = document.createElement('span'),
          roundBox = document.createElement('span'),
          deleteBox = document.createElement('span');

      // listen for swipe events
      scoreWrap.addEventListener('touchstart', handleTouchStart, false);
      scoreWrap.addEventListener('touchmove', handleTouchMove, false);

      // add css classes
      scoreWrap.className = 'round-wrap';
      scoreBox.className = 'score';
      roundBox.className = 'round';
      deleteBox.className = 'delete-box'

      // add the values
      scoreBox.innerHTML = scoreValue;
      roundBox.innerHTML = roundValue + 1; // +1 for humans!
      deleteBox.innerHTML = '×';

      // listen to taps on the deleteBox
      deleteBox.addEventListener('click', function(event) {
        var clickedRound = event.target.parentNode.childNodes[0].innerHTML - 1;
        this.removeScore(clickedRound);
      }.bind(this));

      // add 'delete score' function upon clicking the round number
      roundBox.addEventListener('click', function(event) {
        event.target.parentNode.className = "score-wrap delete-active"
      }.bind(this));

      // nest inside the wrapper
      scoreWrap.appendChild(roundBox);
      scoreWrap.appendChild(scoreBox);
      scoreWrap.appendChild(deleteBox);

      // append to the dom
      this.elements.scores.appendChild(scoreWrap);
    }, this) // 'this' for the outer Player object
  },
  this.clearScoresDisplay = function() {
    this.elements.scores.innerHTML = '';
  },
  this.clearInputBox = function() {
    this.elements.scoreInput.value = '';
  },
  this.erase = function() {
    this.elements.playerWrap.remove();
  }
}


pushPlayer('🦊');
pushPlayer('🐙');

// players.forEach(function(player) {
//   for (var i = 0; i < 25; i += 1) {
//     player.addToScores(Math.floor(Math.random() * 30));
//   }
//   player.refresh();
// })