const { comment } = require('../controllers/commentController');
const { isUserSignedIn } = require('../middleware/authentication');
const { validateSchema } = require('../middleware/validateSchema');
const { validateEngagement, validateComment } = require('../models');

const commentRouter = require('express').Router();


commentRouter.post('/comment',isUserSignedIn,validateSchema(validateComment), comment);

module.exports = commentRouter;