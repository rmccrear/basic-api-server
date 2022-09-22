const express = require("express");
const supertest = require("supertest");

const routes = require("../src/routes");

const app = express();
app.use(routes);

const request = supertest(app);

const mockFarms = [
  {
    id: 1,
    name: "Farm 1",
  },
  {
    id: 2,
    name: "Farm 2",
  },
];

describe("CRUD tests for farms", () => {
  test("It should get an index", async () => {
    const resp = await request.get("/farms");
    const farms = resp.body;
    expect(farms).toEqual(expect.arrayContaining(mockFarms));
  });
  test("It should get a farm", async () => {
    const resp = await request.get("/farms/1");
    const farm = resp.body;
    expect(farm).toEqual(expect.objectContaining({ name: "Farm 1" }));
  });
  test("It should create a farm", async () => {
    const resp = await request.post("/farms/new").send({ name: "New Farm 3" });
    const farm = resp.body;
    expect(farm).toEqual(expect.objectContaining({ name: "New Farm 3" }));
  });
  test("It should update a farm", async () => {
    const resp = await request.patch("/farms/1").send({ name: "Updated Farm" });
    const farm = resp.body;
    expect(farm).toEqual(expect.objectContaining({ name: "Updated Farm" }));
  });
});
