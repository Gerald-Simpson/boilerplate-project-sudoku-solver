'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const testPuzzles =
  require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route('/api/check').post((req, res) => {
    let validation = solver.validate(req.body.puzzle);
    if (validation != true) {
      return res.json(validation);
    }
    if (
      req.body.puzzle === undefined ||
      req.body.coordinate === undefined ||
      req.body.value === undefined
    ) {
      return res.json({ error: 'Required field(s) missing' });
    }
    if (
      !'abcdefghi'.includes(req.body.coordinate.slice(0, 1).toLowerCase()) ||
      !'123456789'.includes(req.body.coordinate.slice(1, 2))
    ) {
      return res.json({ error: 'Invalid coordinate' });
    }
    if (req.body.value > 10 || req.body.value < 1) {
      return res.json({ error: 'Invalid value' });
    }
    let puzzle = req.body.puzzle;
    let row = req.body.coordinate.toLowerCase().charCodeAt(0) - 96;
    let col = parseInt(req.body.coordinate.slice(1, 2));
    let val = parseInt(req.body.value);
    let falseList = [];

    if (!solver.checkRowPlacement(puzzle, row, col, val)) {
      falseList.push('row');
    }
    if (!solver.checkColPlacement(puzzle, row, col, val)) {
      falseList.push('column');
    }
    if (!solver.checkRegionPlacement(puzzle, row, col, val)) {
      falseList.push('region');
    }
    if (falseList.length === 0) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false, conflict: falseList });
    }
  });

  app.route('/api/solve').post((req, res) => {
    let validation = solver.validate(req.body.puzzle);
    if (validation != true) {
      return res.send(validation);
    } else {
      return res.json(solver.solve(req.body.puzzle));
    }
  });
};
