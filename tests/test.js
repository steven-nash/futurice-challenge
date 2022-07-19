// Start app
const app = require('../app.js');
app.listen(5000);

// Set up jest/supertest
//const jest = require('jest');
const supertest = require('supertest');
const request = supertest(app);
const { jest: requiredJest } = require('@jest/globals');

// Test of the given example: "2 * (23/(3*3))- 23 * (2*3)"
// Expected result: -132.88888888888889
it("Provided example", async () => {
  await supertest(app).get('/calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=').expect('Content-Type', /json/).then((res) => {
    expect(res.body.result).toBe(-132.88888888888889);
  });
});

// Test division by zero: "5/0"
// Expected result: null
it("Division by zero", async () => {
  await supertest(app).get("/calculus?query=NS8w").expect('Content-Type', /json/).then((res) => {
    expect(res.body.result).toBe(null);
  });
});

// Test an equation with an invalid letter: "2 * (23f/(3*3))- 23 * (2*3)"
// Expected result: error
it("Invalid letter", async () => {
  await supertest(app).get("/calculus?query=MiAqICgyM2YvKDMqMykpLSAyMyAqICgyKjMp").expect('Content-Type', /json/).then((res) => {
    expect(res.body.error).toBe(true);
  });
});

// Test input surrounded by quotation marks: ""5/3""
// Expected result: error
it("Invalid quotation marks", async () => {
  await supertest(app).get("/calculus?query=IjUvMyI=").expect('Content-Type', /json/).then((res) => {
    expect(res.body.error).toBe(true);
  });
});

// Test invalid symbol: "6-$643"
// Expected result: error
it("Invalid symbol", async () => {
  await supertest(app).get("/calculus?query=Ni0kNjQz").expect('Content-Type', /json/).then((res) => {
    expect(res.body.error).toBe(true);
  });
});

// Empty query: ""
// Expected result: error
it("Empty query", async () => {
  await supertest(app).get("/calculus?query=").expect('Content-Type', /json/).then((res) => {
    expect(res.body.error).toBe(true);
  });
});
