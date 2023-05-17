'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const testPuzzles =
  require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {});

  app.route('/api/solve').post((req, res) => {
    let validation = solver.validate(req.body.puzzle);
    if (validation != true) {
      return res.json(validation);
    } else {
      return res.send(solver.solve(req.body.puzzle));
    }
  });
};
