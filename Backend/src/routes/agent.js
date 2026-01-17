const express = require('express');
const agentRouter = express.Router();
const agentController = require('../controllers/Agents');
const userAuth = require('../middleware/auth');

agentRouter.post('/agents' , userAuth,  agentController.createAgent);
agentRouter.get('/agents', userAuth , agentController.getAllAgents);

module.exports = agentRouter;

