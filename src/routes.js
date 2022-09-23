const { Router, json } = require("express");
const { Farm } = require("./models");
const farmParamsValidator = require("./middleware/validator");

const router = Router();
router.use(json());
// farms
router.get("/farms", async function farmIndex(req, res) {
  const farmList = await Farm.findAll();
  res.status(200).json(farmList);
});

router.get("/farms/:id", function farmGet(req, res) {
  const id = req.params.id;
  const farm = { id: id, name: "Farm " + id };
  res.status(200).json(farm);
});

router.post(
  "/farms/new",
  farmParamsValidator,
  async function farmNew(req, res) {
    const farmParams = req.body;
    const farmObj = await Farm.create(farmParams);
    res.status(200).json(farmObj);
  }
);

async function farmUpdate(req, res) {
  const id = req.params.id;
  const farmParam = req.body;
  const farmObj = await Farm.update(farmParam, { where: { id } });
  res.status(200).json(farmObj);
}
router.put("/farms/:id", farmParamsValidator, farmUpdate);
router.patch("/farms/:id", farmParamsValidator, farmUpdate);

router.delete("/farms/:id", async function farmDelete(req, res) {
  const id = req.params.id;
  await Farm.destroy({ where: { id }, force: true });
  res.status(200).json({ status: "OK" });
});

module.exports = router;
