class SudokuSolver {
  validate(puzzleString) {
    let reg = /^[0-9.]{81}$/;
    if (!puzzleString) {
      return { error: 'Required field missing' };
    } else if (puzzleString.length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' };
    } else if (reg.test(puzzleString)) {
      return true;
    } else {
      return { error: 'Invalid characters in puzzle' };
    }
  }
  rowColumnToStringPosition(row, column) {
    return column - 1 + (row - 1) * 9;
  }
  stringPositionToColumn(stringPosition) {
    return (stringPosition % 9) + 1;
  }
  stringPositionToRow(stringPosition) {
    return Math.floor(stringPosition / 9) + 1;
  }
  stringPositionToRegion(stringPosition) {
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

    // region position of strinPosition
    for (const [key, val] of Object.entries(regionPosDict)) {
      if (val.includes(stringPosition)) {
        return Number(key);
      }
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    // Create a string of only the row
    let rowString = puzzleString.slice(row * 9 - 9, row * 9);
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
    for (let i = 0; i < 81; i++) {
      if (i % 9 === column - 1) {
        colArr.push(puzzleString.slice(i, i + 1));
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
    //Create an array of the string of only the region
    let guessRegion = this.stringPositionToRegion(
      this.rowColumnToStringPosition(row, column)
    );
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

  solve(puzzleString) {
    // create array of puzzle string
    let solvingArr = puzzleString.split('');
    // create array of string positions of empty squares
    let missingPositions = [];
    for (let i = 0; i < 81; i++) {
      if (solvingArr[i] === '.') {
        missingPositions.push(i);
      }
    }

    let incrementMemory = false;
    for (let i = 0; i < missingPositions.length; i++) {
      for (let k = 1; k < 11; k++) {
        if (incrementMemory) {
          // if there is no valid number for the next missionPositions increment the (current) previous number by one and try again
          // increment k
          k = parseInt(solvingArr[missingPositions[i]]) + 1;
          // set solvingArr position back to . until new number found - this will prevent errros with row/col/reg checks if previous numbers have to be changed
          solvingArr[missingPositions[i]] = '.';
          incrementMemory = false;
        }
        if (i < 0) {
          return { error: 'Puzzle cannot be solved' };
        }
        if (k < 10) {
          //test current position for numbers
          let theRow = this.stringPositionToRow(missingPositions[i]);
          let theCol = this.stringPositionToColumn(missingPositions[i]);
          let theReg = this.stringPositionToRegion(missingPositions[i]);

          //if number works, set the number in solvingArr & break out of the k for loop to move on to next positon
          if (
            this.checkColPlacement(solvingArr.join(''), theRow, theCol, k) &
            this.checkRowPlacement(solvingArr.join(''), theRow, theCol, k) &
            this.checkRegionPlacement(solvingArr.join(''), theRow, theCol, k)
          ) {
            solvingArr[missingPositions[i]] = String(k);
            break;
          }
          //if none of numbers work
        }
        if (k === 10) {
          incrementMemory = true;
          // set i for loop back one place
          i -= 2;
        }
      }
    }
    //return the completed  string
    return solvingArr.join('');
  }
}

module.exports = SudokuSolver;
