const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const testPuzzles =
  require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
//.puzzlesAndSolutions[0][0];
let solver = new Solver();

suite('Unit Tests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function () {
    //assert.strictEqual(solver.validate(testPuzzle), true);
    testPuzzles.forEach((array) => {
      assert.strictEqual(solver.validate(array[0]), true);
    });
  });
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
    assert.deepEqual(
      solver.validate(
        '1.5..2.84..63%12.7.2..5..p..9..1....8.2.3674.3w7.2..9.47...8..1..16....926914.37.'
      ),
      { error: 'Invalid characters in puzzle' }
    );
  });
  test('Logic handles a puzzle string that is not 81 characters in length', function () {
    assert.deepEqual(solver.validate(testPuzzles.slice(0, 80)), {
      error: 'Expected puzzle to be 81 characters long',
    });
  });
  test('Logic handles a valid row placement', function () {
    assert.deepEqual(
      solver.checkRowPlacement(testPuzzles[0][0], 1, 2, 3),
      true
    );
  });
  test('Logic handles an invalid row placement', function () {
    assert.deepEqual(
      solver.checkRowPlacement(testPuzzles[0][0], 1, 2, 1),
      false
    );
  });
  test('Logic handles a valid column placement', function () {
    assert.deepEqual(
      solver.checkColPlacement(testPuzzles[0][0], 1, 2, 3),
      true
    );
  });
  test('Logic handles an invalid column placement', function () {
    assert.deepEqual(
      solver.checkRowPlacement(testPuzzles[0][0], 1, 2, 1),
      false
    );
  });
  test('Logic handles a valid region (3x3 grid) placement', function () {
    assert.deepEqual(
      solver.checkColPlacement(testPuzzles[0][0], 1, 2, 3),
      true
    );
  });
  test('Logic handles an invalid region (3x3 grid) placement', function () {
    assert.deepEqual(
      solver.checkRowPlacement(testPuzzles[0][0], 1, 2, 1),
      false
    );
  });
  test('Valid puzzle strings pass the solver', function () {
    testPuzzles.forEach((array) => {
      assert.strictEqual(solver.solve(array[0]), array[1]);
    });
  });
  test('Invalid puzzle strings fail the solver', function () {
    assert.deepEqual(
      solver.solve(
        '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
      ),
      { error: 'Puzzle cannot be solved' }
    );
  });
  test('Solver returns the expected solution for an incomplete puzzle', function () {
    testPuzzles.forEach((array) => {
      assert.strictEqual(solver.solve(array[0]), array[1]);
    });
  });
});
