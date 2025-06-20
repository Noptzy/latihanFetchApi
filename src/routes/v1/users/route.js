const { Router } = require('express');
const userController = require('../../../controllers/usersController.js');
const { createUserSchema, updateUserSchema } = require('../../../validators/users.js');
const validate = require('../../../middlewares/validate.js');
const upload = require('../../../middlewares/uploadProfile.js');
const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', validate(createUserSchema), userController.storeUser);
router.put('/:id', upload.single('photoProfile'),validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
