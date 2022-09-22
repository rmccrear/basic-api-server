const express = require("express");
const supertest = require("supertest");

const sq = require("../db");
const { Farm } = require("../src/models");

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

let farms;

describe("CRUD tests for farms", () => {
  beforeEach(async () => {
    try {
      await Farm.sync({ force: true });
      const farm1 = await Farm.create({ name: "Farm 1" });
      const farm2 = await Farm.create({ name: "Farm 2" });
    } catch (e) {
      console.log(e);
    }
  });
  test("It should get an index", async () => {
    const resp = await request.get("/farms");
    const farms = resp.body;
    expect(farms).toEqual(
      expect.arrayContaining([expect.objectContaining(mockFarms[0])])
    );
  });
  test("It should get a farm", async () => {
    const resp = await request.get("/farms/1");
    const farm = resp.body;
    expect(farm).toEqual(expect.objectContaining({ name: "Farm 1" }));
  });
  test("It should create a farm", async () => {
    const resp = await request.post("/farms/new").send({ name: "New Farm 3" });
    const farmResp = resp.body;
    const farmObj = await Farm.findOne({ where: { id: farmResp.id } });
    expect(farmObj).toEqual(expect.objectContaining({ name: "New Farm 3" }));
  });
  test("It should update a farm", async () => {
    const resp = await request.patch("/farms/1").send({ name: "Updated Farm" });
    const farmObj = await Farm.findOne({ where: { id: "1" } });
    expect(farmObj).toEqual(expect.objectContaining({ name: "Updated Farm" }));
  });
  test("It should delete a farm", async () => {
    const resp = await request.delete("/farms/1").send();
    const farmObj = await Farm.findOne({ where: { id: "1" } });
    expect(farmObj).toBe(null);
  });
});
