var Checkers = require('../js/checkers.js');

describe("Checkers Legal Move Checking Tests", function() {
  var checkers;

  beforeEach(function() {
    checkers = new Checkers();
  });

  it('should identify illegal moves', function() {
    var r;
    var c;

    for (r = -1; r < 2; ++r) {
      for (c = -1; c < 9; ++c) {
        expect(checkers.isIllegalMove(r, c, r - 1, c - 1, 'w')).toBe(true);
        expect(checkers.isIllegalMove(r, c, r + 1, c - 1, 'b')).toBe(true);      
      }
    }

    for (var r = -1; r < 2; ++r) {
      for (var c = -1; c < 9; ++c) {
        expect(checkers.isIllegalMove(r, c, r - 1, c + 1, 'w')).toBe(true);
        expect(checkers.isIllegalMove(r, c, r + 1, c + 1, 'b')).toBe(true);      
      }
    }    

    for (var r = 6; r < 9; ++r) {
      for (var c = -1; c < 9; ++c) {
        expect(checkers.isIllegalMove(r, c, r - 1, c - 1, 'w')).toBe(true);
        expect(checkers.isIllegalMove(r, c, r + 1, c - 1, 'b')).toBe(true);      
      }
    }

    for (var r = 6; r < 9; ++r) {
      for (var c = -1; c < 9; ++c) {
        expect(checkers.isIllegalMove(r, c, r - 1, c + 1, 'w')).toBe(true);
        expect(checkers.isIllegalMove(r, c, r + 1, c + 1, 'b')).toBe(true);
      }
    }
  });

  it('should identify illegal jumps', function() {
    var r;
    var c;

    for (r = -1; r < 2; ++r) {
      for (c = -1; c < 9; ++c) {
        expect(checkers.isIllegalJump(r, c, r - 2, c - 2, 'w')).toBe(true);
        expect(checkers.isIllegalJump(r, c, r + 2, c - 2, 'b')).toBe(true);      
      }
    }

    for (var r = -1; r < 2; ++r) {
      for (var c = -1; c < 9; ++c) {
        expect(checkers.isIllegalJump(r, c, r - 2, c + 2, 'w')).toBe(true);
        expect(checkers.isIllegalJump(r, c, r + 2, c + 2, 'b')).toBe(true);      
      }
    }    

    for (var r = 6; r < 9; ++r) {
      for (var c = -1; c < 9; ++c) {
        expect(checkers.isIllegalJump(r, c, r - 2, c - 2, 'w')).toBe(true);
        expect(checkers.isIllegalJump(r, c, r + 2, c - 2, 'b')).toBe(true);      
      }
    }

    for (var r = 6; r < 9; ++r) {
      for (var c = -1; c < 9; ++c) {
        expect(checkers.isIllegalJump(r, c, r - 2, c + 2, 'w')).toBe(true);
        expect(checkers.isIllegalJump(r, c, r + 2, c + 2, 'b')).toBe(true);
      }
    }
  });

  it('should not reject legal moves', function() {
    var r, c;

    expect(checkers.isIllegalMove(2, 0, 3, 1, 'w')).toBe(false);
    expect(checkers.isIllegalMove(2, 2, 3, 1, 'w')).toBe(false);
    expect(checkers.isIllegalMove(2, 2, 3, 3, 'w')).toBe(false);
    expect(checkers.isIllegalMove(2, 4, 3, 3, 'w')).toBe(false);
    expect(checkers.isIllegalMove(2, 6, 3, 7, 'w')).toBe(false);

    checkers.moveNoCheck(2, 2, 3, 3);
    expect(checkers.isIllegalMove(5, 5, 4, 4, 'b')).toBe(false);
    expect(checkers.isIllegalMove(5, 5, 4, 6, 'b')).toBe(false);    
    //expect(checkers.isIllegalMove(2, 2, 3, 3, 'w')).toBe(true);
  });
});