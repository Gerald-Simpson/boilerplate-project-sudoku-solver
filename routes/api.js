'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
//const testPuzzle = require('../controllers/puzzle-strings.js')
//.puzzlesAndSolutions[0][0];
const testPuzzle =
  '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

const testPuzzleTwo =
  '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/test').get((req, res) => {
    //res.send([solver.validate(testPuzzle), testPuzzle]);
    //res.send([solver.checkRowPlacement(testPuzzle, 1, 1, 2), testPuzzle]);
    //res.send([solver.checkColPlacement(testPuzzle, 2, 1, 2), testPuzzle]);
    //res.send([solver.checkRegionPlacement(testPuzzle, 1, 4, 1), testPuzzle]);
    //res.send([solver.solve(testPuzzle), testPuzzle]);
    res.send([solver.solve(testPuzzleTwo), testPuzzleTwo]);
  });

  app.route('/api/check').post((req, res) => {});

  app.route('/api/solve').post((req, res) => {});
};
