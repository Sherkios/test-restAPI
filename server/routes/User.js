const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const checkId = require('../middleware/checkId');


router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", [checkId], controller.getUsers);
router.put("/:id", [checkId], controller.updateUser);
router.delete("/:id", [checkId], controller.deleteUser);

module.exports = router;
