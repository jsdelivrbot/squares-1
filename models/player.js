var matchesManager = require('./matchesManager');

function Player(name, matchID, matchCreator){ //ERROR: matchNotFound, matchIsFull, nameAlreadyInUse
  this.name = name;
  this.color = '';
  this.position = 0; // squareID
  this.matchCreator = matchCreator; // Indicates if the player created the match
  this.matchID = matchID;
  this.socket = null;
  this.activeDirection = null; // The latest inforamtion about where the player wants to go sent by client
  this.score = 0;

  var match = matchesManager.manager.getMatch(this.matchID);
  if(match instanceof Error){
    return match;
  }

  // Set color (depending on the order the players join) and the startposition (as defined in board)
  switch(match.players.length) {
    case 0:
        this.color = 'blue';
        this.position = match.board.startPoints.blue;
        break;
    case 1:
        this.color = 'orange';
        this.position = match.board.startPoints.orange;
        break;
    case 2:
        this.color = 'green';
        this.position = match.board.startPoints.green;
        break;
    case 3:
        this.color = 'red';
        this.position = match.board.startPoints.red;
        break;
  }

  var x = match.addPlayer(this);
  if(x instanceof Error){
    return x;
  }

}

exports.Player = Player;
