class SudokuSolver {
  validate(puzzleString) {
    let reg = /^[0-9.]{81}$/;
    if (reg.test(puzzleString)) {
      return true;
    } else {
      return false;
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
    // check puzzle string is valid
    if (!this.validate(puzzleString)) {
      return 'invalid puzzle string';
    }
    // create array of puzzle string
    let solvingArr = puzzleString.split('');
    //while (solvingArr.includes('.')) {
    for (let i = 0; i < 100; i++) {
      for (let i = 1; i < 10; i++) {
        let solvingString = solvingArr.join('');
        console.log(solvingString);
        let possiblePositionList = [];
        for (let k = 0; k < 81; k++) {
          if (Number.isInteger(solvingArr[k])) {
            continue;
          }
          // create list of all the string positions where i could be placed
          let theRow = this.stringPositionToRow(k);
          let theCol = this.stringPositionToColumn(k);
          let theReg = this.stringPositionToRegion(k);
          if (
            this.checkColPlacement(solvingString, theRow, theCol, i) &
            this.checkRowPlacement(solvingString, theRow, theCol, i) &
            this.checkRegionPlacement(solvingString, theRow, theCol, i)
          ) {
            possiblePositionList.push([k, theRow, theCol, theReg, i]);
          }
        }
        //console.log(possiblePositionList);
        for (let x = 1; x < 10; x++) {
          //check possiblePositionList for any rows with only one possibility
          let possibleRowList = possiblePositionList.filter(
            (position) => position[1] === x
          );
          if (possibleRowList.length === 1) {
            // Replace the solvingArr element with correct answer
            //console.log(possibleRowList);
            solvingArr[possibleRowList[0][0]] = String(i);
          }
          //check possiblePositionList for any columns with only one possibility
          let possibleColList = possiblePositionList.filter(
            (position) => position[2] === x
          );
          if (possibleColList.length === 1) {
            // Replace the solvingArr element with correct answer
            //console.log(possibleColList);
            solvingArr[possibleColList[0][0]] = String(i);
          }
          //check possiblePositionList for any regions with only one possibility
          let possibleRegList = possiblePositionList.filter(
            (position) => position[3] === x
          );
          if (possibleRegList.length === 1) {
            // Replace the solvingArr element with correct answer
            console.log(possibleRegList);
            console.log(solvingArr[possibleRegList[0][0]]);
            solvingArr[possibleRegList[0][0]] = String(i);
            console.log(solvingArr[possibleRegList[0][0]]);
          }
        }
        //console.log('next num');
        //console.log(solvingArr.join(''));
      }
    }
    return solvingArr.join('');
  }
}

module.exports = SudokuSolver;
