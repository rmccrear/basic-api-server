const supertest = require("supertest");
const { app } = require("../src/server");

const request = supertest(app);

describe("Test app routes", () => {
  test("404 Error handler", (done) => {
    const badPath = "/bad-path";
    request
      .get(badPath)
      .expect(404)
      .then(() => done());
  });
  test("500 Error handler", (done) => {
    request
      .post("/farms/new")
      .send({ badParamE: true })
      .expect(500)
      .then(() => done());
  });
});
