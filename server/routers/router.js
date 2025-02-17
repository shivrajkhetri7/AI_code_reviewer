const express = require("express");
const { getAI } = require("../controllers/ai-agent");
const router = express.Router();

router.post("/ai-prompt", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await getAI(prompt);
        console.log(response);
        if (response) {
            res.json({ result: response })
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;