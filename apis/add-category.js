var express = require("express");
var router = express.Router();

router.get("/get-category", function (req, res, next) {
  res.send("Get Method");
});

router.post("/add-category", function (req, res, next) {
  res.send("Post Method");
});

router.put("/add-update-category", function (req, res, next) {
  res.send("put method");
});

router.patch("/update-category", function (req, res, next) {
  res.send("patch method");
});

router.delete("/delete-category", function (req, res, next) {
  res.send("delete method");
});

module.exports = router;
