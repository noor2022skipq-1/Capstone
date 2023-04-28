const { engage } = require('../controllers/engagementController');
const { isUserSignedIn } = require('../middleware/authentication');
const { validateSchema } = require('../middleware/validateSchema');
const { validateEngagement } = require('../models');

const engagementRouter = require('express').Router();


engagementRouter.post('/engage',isUserSignedIn,validateSchema(validateEngagement), engage);

module.exports = engagementRouter;