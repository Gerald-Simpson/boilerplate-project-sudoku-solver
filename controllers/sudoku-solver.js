class SudokuSolver {
  validate(puzzleString) {
    let reg = /^[0-9.]{81}$/;
    if (reg.test(puzzleString)) {
      return true;
    } else {
      return false;
    }
  }
  checkRowPlacement(puzzleString, row, column, value) {
    // Create a string of only the row
    let rowString = puzzleString.substr(row * 9 - 9, row * 9 - 1);
    //Check if any other numbers in the rowString match the value
    if (rowString.includes(String(value))) {
      // false if number does not work
      return false;
    } else {
      // true if number COULD work in row
      return true;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    //Create a string of only the column
    let colArr = [];
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 === column - 1) {
        colArr.push(puzzleString[i]);
      }
    }
    let colString = colArr.join('');
    //Check if any other numbers in the colString match the value
    if (colString.includes(String(value))) {
      // false if number does not work
      return false;
    } else {
      // true if number COULD work in column
      return true;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    //Dict of region string positions
    let regionPosDict = {
      1: [0, 1, 2, 9, 10, 11, 18, 19, 20],
      2: [3, 4, 5, 12, 13, 14, 21, 22, 23],
      3: [6, 7, 8, 15, 16, 17, 24, 25, 26],
      4: [27, 28, 29, 36, 37, 38, 45, 46, 47],
      5: [30, 31, 32, 39, 40, 41, 48, 49, 50],
      6: [33, 34, 35, 42, 43, 44, 51, 52, 53],
      7: [54, 55, 56, 63, 64, 65, 72, 73, 74],
      8: [57, 58, 59, 66, 67, 68, 75, 76, 77],
      9: [60, 61, 62, 69, 70, 71, 78, 79, 80],
    };

    // string position of guess
    let guessPosition = column - 1 + (row - 1) * 9;

    // region position of guess
    let guessRegion = 0;
    for (const [key, val] of Object.entries(regionPosDict)) {
      if (val.includes(guessPosition)) {
        guessRegion = Number(key);
      }
    }

    //Create an array of the string of only the region
    let regionArr = [];
    regionPosDict[guessRegion].forEach((num) => {
      regionArr.push(puzzleString[num]);
    });

    //Check if any other numbers in the regionStr match the value
    if (regionArr.includes(String(value))) {
      // false if number does not work
      return false;
    } else {
      // true if number COULD work in region
      return true;
    }
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
