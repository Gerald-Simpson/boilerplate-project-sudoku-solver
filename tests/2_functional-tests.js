const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const testPuzzles =
  require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function () {
    chai
      .request(server)
      .post('/api/solve')
      .send({ puzzle: testPuzzles[0][0] })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, testPuzzles[0][1]);
      });
  });
  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function () {
    chai
      .request(server)
      .post('/api/solve')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field missing');
      });
  });
  test('Solve a puzzle with invalid characters: POST request to /api/solve', function () {
    chai
      .request(server)
      .post('/api/solve')
      .send({
        puzzle:
          '1.5..2.84..63%12.7.2..5..p..9..1....8.2.3674.3w7.2..9.47...8..1..16....926914.37.',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Invalid characters in puzzle');
      });
  });
  test('Solve a puzzle with incorrect length: POST request to /api/solve', function () {
    chai
      .request(server)
      .post('/api/solve')
      .send({
        puzzle: testPuzzles.slice(0, 80),
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.body.error,
          'Expected puzzle to be 81 characters long'
        );
      });
  });
  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function () {
    chai
      .request(server)
      .post('/api/solve')
      .send({
        puzzle:
          '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Puzzle cannot be solved');
      });
  });
  test('Check a puzzle placement with all fields: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with missing required fields: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with invalid characters: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with incorrect length: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function () {
    assert.deepEqual(true, false);
  });
});
