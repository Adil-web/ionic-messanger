const Router = require("express").Router;
const userController = require("../controllers/UserController");
const { body } = require("express-validator")
const authMiddleware = require("../middlewares/AuthMiddleware");

const router = Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  body('phone').isLength({ min: 11, max: 17 }),
  body('name').isLength({ min: 2, max: 30 }),
  userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;