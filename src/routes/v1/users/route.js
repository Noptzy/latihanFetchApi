const { Router } = require('express');
const userController = require('../../../controllers/usersController.js');
const { createUserSchema, updateUserSchema} = require('../../../validators/users.js');
const validate = require('../../../middlewares/validate.js');
const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', validate(createUserSchema), userController.storeUser);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;