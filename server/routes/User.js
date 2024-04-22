const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const checkId = require('../middleware/checkId');
const checkFields = require('../middleware/checkFields');

router.post('/', [checkFields], controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', [checkId], controller.getUsers);
router.put('/:id', [checkId, checkFields], controller.updateUser);
router.delete('/:id', [checkId], controller.deleteUser);

module.exports = router;
