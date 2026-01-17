require('dotenv').config();
const Chat = require('../models/Chat');
const Agent = require('../models/Agent');
const axios = require('axios');

const chatWithLLM = async (req,res) => {

    try{
        const { agentId } = req.params;
        const { message } = req.body;
        const user = req.user;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const agent = await Agent.findOne({
        _id: agentId,
        userId: user._id
    });

    console.log(agent);

    if (!agent) {
        return res.status(404).json({ error: "Agent not found" });
    }

    const previousMessages = await Chat.find({ agentId })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
        .exec()

    const contextMessages = previousMessages.reverse();

    const messages = [];
        
        messages.push({
            role: "system",
            content: `Tone: ${agent.tone}. ${agent.prompt}`
        });

        contextMessages.forEach((msg) => {
        messages.push({
        role: msg.role,
        content: msg.content
        })
        });

        messages.push({
            role: "user",
            content: message
        })

        console.log(messages);
        
    const llmResponse = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model: process.env.OPENROUTER_MODEL,
            messages,
            max_tokens: 200
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": `http://localhost:${process.env.PORT}`,
            "X-Title": "ai-agent-builder"
        }
        }
    );

    const reply = llmResponse.data.choices[0].message.content;
    console.log(reply);

    await Chat.create([
        { agentId, role: "user", content: message },
        { agentId, role: "assistant", content: reply }
    ]);

  res.status(200).json({ reply });
    }
    catch (err) {
  console.error("STATUS:", err.response?.status);
  console.error("DATA:", err.response?.data);

  res.status(500).json({
    error: err.response?.data || err.message
  });
}
};


module.exports = {
    chatWithLLM 
};