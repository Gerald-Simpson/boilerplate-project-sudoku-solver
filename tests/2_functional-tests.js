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
        assert.equal(res.body.solution, testPuzzles[0][1]);
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
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'A2',
        value: '3',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: true });
      });
  });
  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'A2',
        value: '4',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { valid: false, conflict: ['row'] });
      });
  });
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'B2',
        value: '7',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          valid: false,
          conflict: ['row', 'column'],
        });
      });
  });
  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'A2',
        value: '2',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          valid: false,
          conflict: ['row', 'column', 'region'],
        });
      });
  });
  test('Check a puzzle placement with missing required fields: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'A2',
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'Required field(s) missing');
      });
  });
  test('Check a puzzle placement with invalid characters: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle:
          '1.5..2.84..63%12.7.2..5..p..9..1....8.2.3674.3w7.2..9.47...8..1..16....926914.37.',
        coordinate: 'A2',
        value: 2,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Invalid characters in puzzle',
        });
      });
  });
  test('Check a puzzle placement with incorrect length: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles.slice(0, 80),
        coordinate: 'A2',
        value: 2,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Expected puzzle to be 81 characters long',
        });
      });
  });
  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'J2',
        value: 2,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Invalid coordinate',
        });
      });
  });
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function () {
    chai
      .request(server)
      .post('/api/check')
      .send({
        puzzle: testPuzzles[0][0],
        coordinate: 'B2',
        value: 22,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: 'Invalid value',
        });
      });
  });
});
