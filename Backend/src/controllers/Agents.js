const Agent = require('../models/Agent');

const createAgent = async(req , res) => {

    const user = req.user;
    const userId = user._id;

    try {
        const {agentName , tone , prompt} = req.body;

        const isNameExists = await Agent.findOne({agentName : agentName })
        if(isNameExists)
        {
            return res.status(401).json({
                message : `${agentName} name already created, please choose another name`
            })
        }
        
        const agent = new Agent({
            userId,
            agentName,
            tone,
            prompt
        })
       const data =  await agent.save();
       res.status(200).json({
        message : "Agent is created Succesfully",
        data
       })
    }
    catch(err){
        res.status(401).json({
            message : `Error : ${err.message}`
        })
    }
}

const getAllAgents = async(req,res) => {

    const user = req.user;
    const userId = user._id;

    try{

        const agents = await Agent.find({
            userId : userId
        })
        
        res.status(200).json({
            message : "All agents related to user",
            agents
        })
    }
    catch(err){
        res.status(401).json({
            message : `ERROR: ${err.message}`
        })
    }
}

module.exports = {
    createAgent,
    getAllAgents
} ;