const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controllers/Chats');
const userAuth = require('../middleware/auth');
 
chatRouter.post('/:agentId/chat', userAuth , chatController.chatWithLLM);
chatRouter.get('/:agentId/messages',userAuth,chatController.getChatMessages);

module.exports = chatRouter;