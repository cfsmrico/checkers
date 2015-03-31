// upon constructing this object, reset the game to a standard Checkers (English-Draughts) game
function Checkers() {
  this.resetGame();
}

// reset the game to a standard Checkers game
Checkers.prototype.resetGame = function() {

  // populate representation of a new Checkers board
  this.square = [
    ['wP', '', 'wP', '', 'wP', '', 'wP', ''],
    ['', 'wP', '', 'wP', '', 'wP', '', 'wP'],
    ['wP', '', 'wP', '', 'wP', '', 'wP', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', 'bP', '', 'bP', '', 'bP', '', 'bP'],
    ['bP', '', 'bP', '', 'bP', '', 'bP', ''],
    ['', 'bP', '', 'bP', '', 'bP', '', 'bP']
  ];

  // init running piece count
  this.move;

  this.pieceBonus = [
    [3, 0, 3, 0, 3, 0, 3, 0],
    [0, 2, 0, 2, 0, 2, 0, 3],
    [3, 0, 1, 0, 1, 0, 2, 0],
    [0, 2, 0, 0, 0, 1, 0, 3],
    [3, 0, 1, 0, 0, 0, 2, 0],
    [0, 2, 0, 1, 0, 1, 0, 3],
    [3, 0, 2, 0, 2, 0, 2, 0],
    [0, 3, 0, 3, 0, 3, 0, 3],
  ];

  this.kingBonus = [
    [-1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 3, 0, 2, 0, 0, 0],
    [0, 1, 0, 1, 0, 2, 0, 0],
    [0, 0, 2, 0, 1, 0, 1, 0],
    [0, 0, 0, 2, 0, 3, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, -1],
  ];

  this.pieceValue = 2;
  this.kingValue = 9;
};

Array.prototype.clone = function() {
  var arr = this.slice(0);
  for (var i = 0; i < this.length; ++i) {
    if (this[i].clone) {
      arr[i] = this[i].clone();
    }
  }
  return arr;
};

// player should be 'w' for white(/red) or 'b' for black
// guiPosition is an object of the form: {b8: "bP", d8: "bP", f8: "bP", h8: "bP", a7: "bP"…}
Checkers.prototype.areAnyJumpsAvailable = function(player, guiPosition) {
// iterate through all populated positions matching given player and return true if a jump is available
  for (var i in guiPosition) {  
    // check piece for jumps if matching color
    if (guiPosition[i][0] == player) {

      // if a legal jump is available for piece i, return true
      if (this.isLegalJumpAvailable(player, i, guiPosition[i])) {
        return true;        
      }
    }
  }

  return false;
};

// player should be 'w' for white(/red) or 'b' for black
// guiPosition is an object of the form: {b8: "bP", d8: "bP", f8: "bP", h8: "bP", a7: "bP"…}
Checkers.prototype.areAnyMovesAvailable = function(player, guiPosition) {
// iterate through all populated positions matching given player and return true if a jump is available
  for (var i in guiPosition) {
    // check piece for moves if matching color
    if (guiPosition[i][0] == player) {

      // if a legal move is available for piece i, return true
      if (this.isLegalMoveAvailable(player, i, guiPosition[i])) {
        return true;        
      }
    }
  }

  return false;
};

// return true is a legal jump is available given player, position, and piece
Checkers.prototype.isLegalJumpAvailable = function(player, position, piece) {
  if (player == 'w') {
    return this.isLegalWhiteJumpAvailable(position, piece);
  } else {
    return this.isLegalBlackJumpAvailable(position, piece);
  }
};

// return true is a legal white jump is available
Checkers.prototype.isLegalWhiteJumpAvailable = function(position, piece) {
  var c = this.fileToCol(position[0]);
  var r = position[1] - 1;

  // check if jumping SW is illegal
  if (!this.isIllegalJump(r, c, r + 2, c - 2, 'w')) {
    return true;
  }

  // check if jumping SE is illegal
  if (!this.isIllegalJump(r, c, r + 2, c + 2, 'w')) {
    return true;
  }

  // check legal backward jumps for the king
  if (piece[1] == 'K') {

    // check if jumping NW is illegal
    if (!this.isIllegalJump(r, c, r - 2, c - 2, 'w')) {
      return true;
    }

    // check if jumping NE is illegal
    if (!this.isIllegalJump(r, c, r - 2, c + 2, 'w')) {
      return true;          
    }
  }

  return false;
};

Checkers.prototype.isLegalBlackJumpAvailable = function(position, piece) {
  var c = this.fileToCol(position[0]);
  var r = position[1] - 1;

  // check if jumping NW is illegal
  if (!this.isIllegalJump(r, c, r - 2, c - 2, 'b')) {
    return true;
  }

  // check if jumping NE is illegal
  if (!this.isIllegalJump(r, c, r - 2, c + 2, 'b')) {
    return true;
  }

  // check legal backward jumps for the king
  if (piece[1] == 'K') {

    // check if jumping SW is illegal
    if (!this.isIllegalJump(r, c, r + 2, c - 2, 'b')) {
      return true;
    }

    // check if jumping SE is illegal
    if (!this.isIllegalJump(r, c, r + 2, c + 2, 'b')) {
      return true;          
    }
  }

  return false;
};

// return true if legal moves available for given player, position, piece
Checkers.prototype.isLegalMoveAvailable = function(player, position, piece) {
  if (player == 'w') {
    return this.isLegalWhiteMoveAvailable(position, piece);
  } else {
    return this.isLegalBlackMoveAvailable(position, piece);
  }  
};

// return true if legal white move available for given position + piece
Checkers.prototype.isLegalWhiteMoveAvailable = function(position, piece) {
  var c = this.fileToCol(position[0]);
  var r = position[1] - 1;

  // check if moving SW is illegal
  if (!this.isIllegalMove(r, c, r + 1, c - 1, 'w')) {
    return true;
  }

  // check if moving SE is illegal
  if (!this.isIllegalMove(r, c, r + 1, c + 1, 'w')) {
    return true;
  }

  // check legal backward moves for the king
  if (piece[1] == 'K') {

    // check if moving NW is illegal
    if (!this.isIllegalMove(r, c, r - 1, c - 1, 'w')) {
      return true;
    }

    // check if moving NE is illegal
    if (!this.isIllegalMove(r, c, r - 1, c + 1, 'w')) {
      return true;          
    }
  }

  return false;
};

// return true if legal black move available for given position + piece
Checkers.prototype.isLegalBlackMoveAvailable = function(position, piece) {
  var c = this.fileToCol(position[0]);
  var r = position[1] - 1;

  // check if moving NW is illegal
  if (!this.isIllegalMove(r, c, r - 1, c - 1, 'b')) {
    return true;
  }

  // check if moving NE is illegal
  if (!this.isIllegalMove(r, c, r - 1, c + 1, 'b')) {
    return true;
  }

  // check legal backward moves for the king
  if (piece[1] == 'K') {

    // check if moving SW is illegal
    if (!this.isIllegalMove(r, c, r + 1, c - 1, 'b')) {
      return true;
    }

    // check if moving SE is illegal
    if (!this.isIllegalMove(r, c, r + 1, c + 1, 'b')) {
      return true;          
    }
  }

  return false;
};

// player should be 'w' for white(/red) or 'b' for black
// guiPosition is an object of the form: {b8: "bP", d8: "bP", f8: "bP", h8: "bP", a7: "bP"…}
Checkers.prototype.gameOver = function(player, guiPosition) {
  if (!this.areAnyJumpsAvailable(player, guiPosition) && !this.areAnyMovesAvailable(player, guiPosition)) {
    return true;    
  }

  return false;
};

// return a mapping from a column to a file
Checkers.prototype.colToFile = function(col) {
  switch (col) {
    case 0: return 'a';
    case 1: return 'b';
    case 2: return 'c';
    case 3: return 'd';
    case 4: return 'e';
    case 5: return 'f';
    case 6: return 'g';
    case 7: return 'h';
  }
}

// return a mapping from a file to a column
Checkers.prototype.fileToCol = function(file) {
  switch (file) {
    case 'a': return 0;
    case 'b': return 1;
    case 'c': return 2;
    case 'd': return 3;
    case 'e': return 4;
    case 'f': return 5;
    case 'g': return 6;
    case 'h': return 7;
  }
};

Checkers.prototype.getPositionOf = function(board) {
  var position = {};

  for (var c = 0; c < 8; ++c) {
    for (var r = 0; r < 8; ++r) {
      var file = this.colToFile(c);
      var rank = r + 1;

      if (board[r][c] != '') {
        position[file + rank] = board[r][c];
      }
    }
  }

  return position;  
}

// return a position object from square representation
Checkers.prototype.getPosition = function() {
  var position = {};

  for (var c = 0; c < 8; ++c) {
    for (var r = 0; r < 8; ++r) {
      var file = this.colToFile(c);
      var rank = r + 1;

      if (this.square[r][c] != '') {
        position[file + rank] = this.square[r][c];
      }
    }
  }

  return position;
};

/*
 *    If moving the piece from square[r1][c1] to square[r2][c2]
 *  violates Checkers rules, then return true, and false otherwise.
 */
Checkers.prototype.isIllegalMove = function(r1, c1, r2, c2, player, square) {
  if (r2 < 0 || c2 < 0 || r2 > 7 || c2 > 7)  // out of bounds
    return true;

  var square = square == undefined ? this.square : square;

  if (square[r2][c2] != '') // square not empty
    return true;
  if (square[r1][c1] == '' || square[r1][c1][0] != player)
    return true;
  else if (r2 != r1 + 1 && r2 != r1 - 1)  // invalid row2;
    return true;
  else if (c2 != c1 + 1 && c2 != c1 - 1)  // invalid col2
    return true;
  else  // if attempting to move backwards with a regular piece
  {
    if (square[r1][c1] == 'wP' && r2 < r1)
      return true;
    else if (square[r1][c1] == 'bP' && r2 > r1)
      return true;
  }

  return false;
};

/*
 *    If moving the piece from square[r1][c1] to square[r2][c2]
 *  violates Checkers rules, then return true, and false otherwise.
 */
Checkers.prototype.isIllegalJump = function(r1, c1, r2, c2, player, square) {
  if (r2 < 0 || c2 < 0 || r2 > 7 || c2 > 7)  // out of bounds
    return true;

  var square = square == undefined ? this.square : square;

  if (square[r2][c2] != '')  // square2 not empty
    return true;
  if (square[r1][c1] == '' || square[r1][c1][0] != player)
    return true;
  else if (r2 != r1 + 2 && r2 != r1 - 2)  // invalid row2
    return true;
  else if (c2 != c1 + 2 && c2 != c1 - 2)  // invalid col2
    return true;
  else if (square[r1][c1] == 'wP' && r2 < r1)  // moving backwards
    return true;
  else if (square[r1][c1] == 'bP' && r2 > r1)  // moving backwards
    return true;
  else  // if jumping over an empty square or a piece of the same color
  {
    if (r1 < r2 && c1 < c2) // jump NE from (r1, c1) -> (r2, c2)
    {
      if (square[r1 + 1][c1 + 1] == '' || square[r1 + 1][c1 + 1] == square[r1][c1] ||
          (square[r1][c1] == 'wK' && square[r1 + 1][c1 + 1] == 'wP') ||
          (square[r1][c1] == 'bK' && square[r1 + 1][c1 + 1] == 'bP') ||
          (square[r1][c1] == 'wP' && square[r1 + 1][c1 + 1] == 'wK') ||
          (square[r1][c1] == 'bP' && square[r1 + 1][c1 + 1] == 'bK'))
        return true;
    }
    else if (r1 < r2 && c1 > c2)  // jump NW from (r1, c1) -> (r2, c2)
    {
      if (square[r1 + 1][c1 - 1] == '' || square[r1 + 1][c1 - 1] == square[r1][c1] ||
          (square[r1][c1] == 'wK' && square[r1 + 1][c1 - 1] == 'wP') ||
          (square[r1][c1] == 'bK' && square[r1 + 1][c1 - 1] == 'bP') ||
          (square[r1][c1] == 'wP' && square[r1 + 1][c1 - 1] == 'wK') ||
          (square[r1][c1] == 'bP' && square[r1 + 1][c1 - 1] == 'bK'))
        return true;
    }
    else if (r1 > r2 && c1 > c2)  // jump SW from (r1, c1) -> (r2, c2)
    {
      if (square[r1 - 1][c1 - 1] == '' || square[r1 - 1][c1 - 1] == square[r1][c1] ||
          (square[r1][c1] == 'wK' && square[r1 - 1][c1 - 1] == 'wP') ||
          (square[r1][c1] == 'bK' && square[r1 - 1][c1 - 1] == 'bP') ||
          (square[r1][c1] == 'wP' && square[r1 - 1][c1 - 1] == 'wK') ||
          (square[r1][c1] == 'bP' && square[r1 - 1][c1 - 1] == 'bK'))
        return true;
    }
    else  // jump SE from (r1, c1) -> (r2, c2)
    {
      if (square[r1 - 1][c1 + 1] == '' || square[r1 - 1][c1 + 1] == square[r1][c1] ||
          (square[r1][c1] == 'wK' && square[r1 - 1][c1 + 1] == 'wP') ||
          (square[r1][c1] == 'bK' && square[r1 - 1][c1 + 1] == 'bP') ||
          (square[r1][c1] == 'wP' && square[r1 - 1][c1 + 1] == 'wK') ||
          (square[r1][c1] == 'bP' && square[r1 - 1][c1 + 1] == 'bK'))
        return true;
    }
  }

  return false;  
};

// return false if move not possible, else make the move and return 1 for jump and 2 for move
Checkers.prototype.move = function(from, to, player) {
  var file1 = from[0];
  var rank1 = from[1];
  var file2 = to[0];
  var rank2 = to[1];

  if (this.rankFileJump(file1, rank1, file2, rank2, player)) {
    return 1;
  }

  if (this.rankFileMove(file1, rank1, file2, rank2, player)) {
    return 2;
  }

  return false;
}

// move the piece on square[rank1 - 1][file1] to square[rank2 - 1][file2] or false if not possible
Checkers.prototype.rankFileMove = function(file1, rank1, file2, rank2, player) {  
  return this.movePiece(rank1 - 1, this.fileToCol(file1), rank2 - 1, this.fileToCol(file2), player);
};

// move the piece on square[r1][c1] to square[r2][c2] or false if not possible
Checkers.prototype.movePiece = function(r1, c1, r2, c2, player) {
  if (this.isIllegalMove(r1, c1, r2, c2, player))
    return false;

  var square = this.square;

  if (r2 == 0 && square[r1][c1] == 'bP') {
    square[r2][c2] = 'bK';  // crown the black piece
  }
  else if (r2 == 7 && square[r1][c1] == 'wP') {
    square[r2][c2] = 'wK';   // crown the white piece
  }
  else
    square[r2][c2] = square[r1][c1];  // advance the piece

  square[r1][c1] = '';
  return true;
};

// move the piece on square[rank1][file1] to square[rank2][file2] or false if not possible
Checkers.prototype.rankFileJump = function(file1, rank1, file2, rank2, player) {
  return this.jumpPiece(rank1 - 1, this.fileToCol(file1), rank2 - 1, this.fileToCol(file2), player);
};

// move the piece on square[r1][c1] to square[r2][c2] or false if not possible
Checkers.prototype.jumpPiece = function(r1, c1, r2, c2, player) {
  if (this.isIllegalJump(r1, c1, r2, c2, player))
    return false;

  return this.jumpNoCheck(r1, c1, r2, c2);
};

// move the piece on square[r1][c1] to square[r2][c2] without checking for an illegal jump
Checkers.prototype.jumpNoCheck = function(r1, c1, r2, c2, board)
{
  var square = board == undefined ? this.square : board;

  if (r1 < r2 && c1 < c2) // jump NE from (r1, c1) -> (r2, c2)
  {
    if (r2 == 7 && square[r1][c1] == 'wP') {
      square[r2][c2] = 'wK';   // crown the white piece
    }
    else
      square[r2][c2] = square[r1][c1];

    square[r1 + 1][c1 + 1] = '';
  }
  else if (r1 < r2 && c2 < c1)  // move NW from (r1, c1) -> (r2, c2)
  {
    if (r2 == 7 && square[r1][c1] == 'wP') {
      square[r2][c2] = 'wK';   // crown the white piece
    }
    else
      square[r2][c2] = square[r1][c1];

    square[r1 + 1][c1 - 1] = '';    
  }
  else if (r2 < r1 && c2 < c1)  // move SW from (r1, c1) -> (r2, c2)
  {
    if (r2 == 0 && square[r1][c1] == 'bP') {
      square[r2][c2] = 'bK';  // crown the black piece
    }
    else
      square[r2][c2] = square[r1][c1];

    square[r1 - 1][c1 - 1] = '';    
  }
  else  // move SE from (r1, c1) -> (r2, c2)
  {
    if (r2 == 0 && square[r1][c1] == 'bP') {
      square[r2][c2] = 'bK';  // crown the black piece
    }
    else
      square[r2][c2] = square[r1][c1];

    square[r1 - 1][c1 + 1] = '';
  }

  square[r1][c1] = '';  // clear origin square
  return true;
};

/*
 *    Move the piece on square[r1][c1] to square[r2][c2]
 *  without checking for an illegal move
 */
Checkers.prototype.moveNoCheck = function(r1, c1, r2, c2, board) {
  var square = board == undefined ? this.square : board;

  if (r2 == 0 && square[r1][c1] == 'bP') {
    square[r2][c2] = 'bK';  // crown the black piece
  }
  else if (r2 == 7 && square[r1][c1] == 'wP') {
    square[r2][c2] = 'wK';   // crown the white piece
  }
  else
    square[r2][c2] = square[r1][c1];

  square[r1][c1] = '';
};

Checkers.prototype.opposite = function(player) {
  if (player == 'w') {
    return 'b';
  }

  return 'w';
}

// here we go...
Checkers.prototype.minimax = function(board, depth, player) {
  var bCopy;
  var valuePath = {Path: [], Value: 0};
  var resultSucc = {Path: [], Value: 0};
  var legalMoves = [];
  var legalJumps = [];
  var bestPath = {Path: [], Value: 0};
  var jumpSequence = [];

  if (depth == 0 || this.gameOver(player, this.getPositionOf(board))) {
    valuePath.Value = this.staticEval(board);
    return valuePath;
  } else {
    this.moveGen(board, player, legalMoves, legalJumps);
  }

  if (legalMoves.length < 1 && legalJumps.length < 1) {
    valuePath.Value = this.staticEval(board);
    return valuePath;
  }

  var bestScore = player == 'w' ? Number.MIN_VALUE : Number.MAX_VALUE;
  var newValue;

  if (!legalJumps.length < 1) {
    for (var i = 0; i < legalJumps.length; ++i) {
      bCopy = board.clone();

      for (var k = 0; k < legalJumps[i].length; ++k) {
        move = legalJumps[i][k];
        this.jumpNoCheck(move[0], move[1], move[2], move[3], bCopy);
      }

      resultSucc = this.minimax(bCopy, depth - 1, this.opposite(player));
      newValue = -resultSucc.Value;

      if (player == 'w') {
        if (newValue > bestScore) {
          bestScore = newValue;
          resultSucc.Path.push(legalJumps[i]);
          bestPath = resultSucc;
        } 
      }
      else {
        if (newValue < bestScore) {
           bestScore = newValue;
           resultSucc.Path.push(legalJumps[i]);
           bestPath = resultSucc;
        }
      }
    }
  } 
  else {  // !legalMoves.empty()
    for (var i = 0; i < legalMoves.length; ++i) {
      bCopy = board.clone();
      move = legalMoves[i];
      this.moveNoCheck(move[0], move[1], move[2], move[3], bCopy);
      resultSucc = this.minimax(bCopy, depth - 1, this.opposite(player));
      newValue = -resultSucc.Value;

      if (player == 'w') {
        if (newValue > bestScore) {
          bestScore = newValue;
          resultSucc.Path.push(legalMoves[i]);
          bestPath = resultSucc;
          jumpSequence = [];
        }
      } 
      else {
        if (newValue < bestScore) {
            bestScore = newValue;
            resultSucc.Path.push(legalMoves[i]);
            bestPath = resultSucc;
            jumpeSequence = [];
        }
      }
    }
  }

  bestPath.Value = bestScore;
  return bestPath;
};


Checkers.prototype.playerEval = function(player, board) {
  if (player == 'b') {
    return -this.staticEval(board);
  } else {
    return this.staticEval(board);
  }
};

Checkers.prototype.staticEval = function(board) {
  var score = 0;

  for (var r = 0; r < 8; ++r) {
    for (var c = 0; c < 8; ++c) {
      var piece = board[r][c];
      if (piece == '')
        continue;

        if (piece == 'wP') {
          score += 2;
          score += this.pieceBonus[r][c];
          //console.log('gained ' + this.pieceBonus[r][c] + ' position points' + ' for square [' + r + ',' + c + ']');
        } else if (piece == 'wK') {
          score += 9;
          score += this.kingBonus[r][c];
          //console.log('gained ' + this.kingBonus[r][c] + ' position points' + ' for square [' + r + ',' + c + ']');
        } else if (piece == 'bP') {
          score -= 2; 
          score -= this.pieceBonus[r][c];
          //console.log('lost ' + this.pieceBonus[r][c] + ' position points' + ' for square [' + r + ',' + c + ']');
        } else {  // piece == 'bK' 
          score -= 9; 
          score -= this.kingBonus[r][c];
          //console.log('lost ' + this.kingBonus[r][c] + ' position points' + ' for square [' + r + ',' + c + ']');
        }
    }
  }  

  return score;
};

Checkers.prototype.jumpGenBlack = function(board, legalJumps, jumpSequence) {
  var boardCopy;
  if (jumpSequence == undefined) var jumpSequence = [];
  var r2;
  var c2;

  // check all rows (greatly simplifies)
  for (var r = 0; r < 8; ++r) {
    for (var c = 0; c < 8; ++c) {
      // list all legal forward jumps for the piece
      if (board[r][c][0] == 'b') {
        // check if jumping NW is illegal
        r2 = r - 2;
        c2 = c - 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.jumpGenBlack(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }

        // check if jumping NE is illegal
        r2 = r - 2;
        c2 = c + 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.jumpGenBlack(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }
      }

      // add legal backward jumps for the king
      if (board[r][c] == 'bK') {
        // check if jumping SW is illegal
        r2 = r + 2;
        c2 = c - 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.jumpGenBlack(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }

        // check if jumping SE is illegal
        r2 = r + 2;
        c2 = c + 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.jumpGenBlack(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }        
      }
    }
  }
};

Checkers.prototype.jumpGenWhite = function(board, legalJumps, jumpSequence) {
  var boardCopy;
  if (jumpSequence == undefined) var jumpSequence = [];
  var r2;
  var c2;

  // check all rows (greatly simplifies)
  for (var r = 0; r < 8; ++r) {
    for (var c = 0; c < 8; ++c) {
      // list all legal forward jumps for the piece
      if (board[r][c][0] == 'w') {
        // check if jumping SW is illegal
        r2 = r + 2;
        c2 = c - 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.genJumpSequenceWhite(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }

        // check if jumping SE is illegal
        r2 = r + 2;
        c2 = c + 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.genJumpSequenceWhite(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }
      }

      // add legal backward jumps for the king
      if (board[r][c] == 'wK') {
        // check if jumping NW is illegal
        r2 = r - 2;
        c2 = c - 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.genJumpSequenceWhite(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }

        // check if jumping NE is illegal
        r2 = r - 2;
        c2 = c + 2;
        if (!this.isIllegalJump(r, c, r2, c2, board)) {
          jumpSequence.push([r, c, r2, c2]);  // push jump into jump-sequence
          boardCopy = board.clone();  // copy position
          this.jumpNoCheck(r, c, r2, c2, boardCopy);  // alter position
          this.genJumpSequenceWhite(boardCopy, legalJumps, jumpSequence); // build jump-sequence
          jumpSequence = [];  // clear stale jump vector
        }        
      }
    }
  }
};

Checkers.prototype.moveGen = function(board, player, legalMoves, legalJumps) {
  // check if jumps are available (one must be taken)
  if (player == 'w') {
    this.jumpGenWhite(board, legalJumps);
  } else {
    this.jumpGenBlack(board, legalJumps);
  }

  // if any legal jumps exist, then no need to generate moves
  if (legalJumps.length > 0) {
    return;
  }

  var r2;
  var c2;

  // list all legal black moves
  if (player == 'b') {
    // check all rows (for simplicity)
    for (var r = 0; r < 8; ++r) {
      for (var c = 0; c < 8; ++c) {
        // list all legal forward moves for the piece
        if (board[r][c][0] == 'b') {
          // check if moving NW is illegal
          r2 = r - 1;
          c2 = c - 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }

          // check if moving NE is illegal
          r2 = r - 1;
          c2 = c + 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }
        }

        // add legal backward moves for the king
        if (board[r][c] == 'bK') {
          // check if moving SW is illegal
          r2 = r + 1;
          c2 = c - 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }

          // check if moving SE is illegal
          r2 = r + 1;
          c2 = c + 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }          
        }
      }
    }
  } else { // player == 'w'
    // check all rows (for simplicity)
    for (var r = 0; r < 8; ++r) {
      for (var c = 0; c < 8; ++c) {
        // list all legal forward moves for the piece
        if (board[r][c][0] == 'w') {
          // check if moving SW is illegal
          r2 = r + 1;
          c2 = c - 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }

          // check if moving SE is illegal
          r2 = r + 1;
          c2 = c + 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }
        }

        // add legal backward moves for the king
        if (board[r][c] == 'wK') {
          // check if moving NW is illegal
          r2 = r - 1;
          c2 = c - 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }

          // check if moving NE is illegal
          r2 = r - 1;
          c2 = c + 1;
          if (!this.isIllegalMove(r, c, r2, c2, player, board)) {
            legalMoves.push([r, c, r2, c2]);
          }          
        }
      }
    }
  }
};

Checkers.prototype.deepEnough = function(depth) {
  if (depth > this.depthCutoff)
    return true;
  else
    return false;
};