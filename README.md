# checkers
Took chessboard.js and converted into a checkers board.  Added in checkers.js for legal move checking.
Added in a static evaluation function where pieces are valued at 2 and kings at 9, 
and position value matrices are applied like so:
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
Still need to program in the AI. Running index.htm in the browser yields a checkers game.
