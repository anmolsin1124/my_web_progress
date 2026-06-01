const express = require('express');
const commentrouter = express.Router();
commentrouter.get("/comment", async (req, res) => {
    res.send("Comment route");
})

commentrouter.post("/comment", async (req, res) => {
    res.send("Comment route");
})
commentrouter.delete("/comment/:id", async (req, res) => {
    res.send("Comment route");
})
commentrouter.patch("/comment/:id", async (req, res) => {
    res.send("Comment route");
})

module.exports = commentrouter; 