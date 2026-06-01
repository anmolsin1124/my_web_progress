

const express = require("express");
const userrouter = express.Router();

userrouter.get("/user", userAuth, async (req, res) => {

    try {

        res.send(req.result);
    }
    catch (err) {

        res.send("Error " + err.message);
    }


})

userrouter.delete("/user/:id", userAuth, async (req, res) => {

    try {

        //  authenticate the user: Token
        await User.findByIdAndDelete(req.params.id);
        res.send("Deleted Succesfully");
    }
    catch (err) {

        res.send("Error" + err.message);
    }


})


userrouter.patch("/user", userAuth, async (req, res) => {

    try {
        const { _id, ...update } = req.body;

        await User.findByIdAndUpdate(_id, update, { "runValidators": true });
        res.send("Update Succesfully");
    }
    catch (err) {
        res.send("Error " + err.message);
    }
})
module.exports = userrouter;
