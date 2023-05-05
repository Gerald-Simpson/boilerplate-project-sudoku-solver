'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const testPuzzle = require('../controllers/puzzle-strings.js')
  .puzzlesAndSolutions[0][0];

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/test').get((req, res) => {
    res.send([solver.validate(testPuzzle), testPuzzle]);
  });

  app.route('/api/check').post((req, res) => {});

  app.route('/api/solve').post((req, res) => {});
};
