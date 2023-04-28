const { login, signup, logout } = require('../controllers/userController');
const { isUserSignedIn } = require('../middleware/authentication');
const { validateSchema } = require('../middleware/validateSchema');
const { validateLogin, validateSignUp } = require('../models');

const userRouter = require('express').Router();


userRouter.get('/login',validateSchema(validateLogin), login);
userRouter.post('/signup',validateSchema(validateSignUp),signup);
userRouter.get('/logout',isUserSignedIn,logout);

module.exports = userRouter;