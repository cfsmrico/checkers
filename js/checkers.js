// upon constructing this object, reset the game to a standard Checkers (English-Draughts) game
function Checkers() {
  this.resetGame();
};

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
  this.whitePieces = 12;
  this.blackPieces = 12;
  this.whiteKings = 0;
  this.blackKings = 0;  
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
  if (this.whitePieces + this.whiteKings < 0 || this.blackPieces + this.blackKings < 0 ||
      !this.areAnyJumpsAvailable(player, guiPosition) || !this.areAnyMovesAvailable(player, guiPosition)) {
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
Checkers.prototype.isIllegalMove = function(r1, c1, r2, c2, player) {
  if (r2 < 0 || c2 < 0 || r2 > 7 || c2 > 7)  // out of bounds
    return true;

  var square = this.square;

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
Checkers.prototype.isIllegalJump = function(r1, c1, r2, c2, player) {
  if (r2 < 0 || c2 < 0 || r2 > 7 || c2 > 7)  // out of bounds
    return true;

  var square = this.square;

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
    ++this.blackKings;
    --this.blackPieces;
  }
  else if (r2 == 7 && square[r1][c1] == 'wP') {
    square[r2][c2] = 'wK';   // crown the white piece
    ++this.whiteKings;
    --this.whitePieces;
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
Checkers.prototype.jumpNoCheck = function(r1, c1, r2, c2)
{
  var square = this.square;
  var pieceToRemove;

  if (r1 < r2 && c1 < c2) // jump NE from (r1, c1) -> (r2, c2)
  {
    if (r2 == 7 && square[r1][c1] == 'wP') {
      square[r2][c2] = 'wK';   // crown the white piece
      ++this.whiteKings;
      --this.whitePieces;
    }
    else
      square[r2][c2] = square[r1][c1];

    pieceToRemove = square[r1 + 1][c1 + 1];
    square[r1 + 1][c1 + 1] = '';
  }
  else if (r1 < r2 && c2 < c1)  // move NW from (r1, c1) -> (r2, c2)
  {
    if (r2 == 7 && square[r1][c1] == 'wP') {
      square[r2][c2] = 'wK';   // crown the white piece
      ++this.whiteKings;
      --this.whitePieces;
    }
    else
      square[r2][c2] = square[r1][c1];

    pieceToRemove = square[r1 + 1][c1 - 1];
    square[r1 + 1][c1 - 1] = '';    
  }
  else if (r2 < r1 && c2 < c1)  // move SW from (r1, c1) -> (r2, c2)
  {
    if (r2 == 0 && square[r1][c1] == 'bP') {
      square[r2][c2] = 'bK';  // crown the black piece
      ++this.blackKings;
      --this.blackPieces;
    }
    else
      square[r2][c2] = square[r1][c1];

    pieceToRemove = square[r1 - 1][c1 - 1];
    square[r1 - 1][c1 - 1] = '';    
  }
  else  // move SE from (r1, c1) -> (r2, c2)
  {
    if (r2 == 0 && square[r1][c1] == 'bP') {
      square[r2][c2] = 'bK';  // crown the black piece
      ++this.blackKings;
      --this.blackPieces;
    }
    else
      square[r2][c2] = square[r1][c1];

    pieceToRemove = square[r1 - 1][c1 + 1];
    square[r1 - 1][c1 + 1] = '';
  }

  switch (pieceToRemove) {
    case 'wP': 
      --this.whitePieces;
      break;
    case 'wK':
      --this.whiteKings;
      break;
    case 'bP':
      --this.blackPieces;
      break;
    case 'bK':
      --this.blackKings;
      break;
  }

  square[r1][c1] = '';  // clear origin square
  return true;
};

/*
 *    Move the piece on square[r1][c1] to square[r2][c2]
 *  without checking for an illegal move
 */
Checkers.prototype.moveNoCheck = function(r1, c1, r2, c2) {
  var square = this.square;

  if (r2 == 0 && square[r1][c1] == 'bP') {
    square[r2][c2] = 'bK';  // crown the black piece
    ++this.blackKings;
    --this.blackPieces;
  }
  else if (r2 == 7 && square[r1][c1] == 'wP') {
    square[r2][c2] = 'wK';   // crown the white piece
    ++this.whiteKings;
    --this.whitePieces;
  }
  else
    square[r2][c2] = square[r1][c1];

  square[r1][c1] = '';
};
