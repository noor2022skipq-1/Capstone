const { createStory, editStory, deleteStory, trendingStories } = require('../controllers/storyController');
const { isUserSignedIn } = require('../middleware/authentication');
const { validateSchema } = require('../middleware/validateSchema');
const { validateStory } = require('../models');

const storyRouter = require('express').Router();


storyRouter.post('/create',isUserSignedIn,validateSchema(validateStory), createStory);
storyRouter.put('/edit',isUserSignedIn, editStory);
storyRouter.post('/delete',isUserSignedIn, deleteStory);
storyRouter.get('/trending',isUserSignedIn, trendingStories);

module.exports = storyRouter;