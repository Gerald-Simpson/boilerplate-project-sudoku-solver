class SudokuSolver {
  validate(puzzleString) {
    let reg = /^[0-9.]{81}$/;
    if (reg.test(puzzleString)) {
      return true;
    } else {
      return false;
    }
  }
  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
