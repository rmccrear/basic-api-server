const { Router, json } = require("express");

const router = Router();
router.use(json());
// farms
router.get("/farms", function farmIndex(req, res) {
  const farmList = [
    { id: 1, name: "Farm 1" },
    { id: 2, name: "Farm 2" },
  ];
  res.status(200).json(farmList);
});

router.get("/farms/:id", function farmGet(req, res) {
  const id = req.params.id;
  const farm = { id: id, name: "Farm " + id };
  res.status(200).json(farm);
});

router.post("/farms/new", function farmNew(req, res) {
  const farm = req.body;
  console.log(farm);
  res.status(200).json(farm);
});

function farmUpdate(req, res) {
  const farm = req.body;
  res.status(200).json(farm);
}
router.put("/farms/:id", farmUpdate);
router.patch("/farms/:id", farmUpdate);

router.delete("/farms/:id", function farmDelete(req, res) {
  res.status(200).json({ status: "OK" });
});

module.exports = router;
