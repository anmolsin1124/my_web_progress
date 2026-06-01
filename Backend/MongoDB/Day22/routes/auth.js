const express = require('express');
const authrouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const validUser = require("../validation/validUser");

authrouter.post("/register", async (req, res) => {

    try {

        // Validate kya uske andar firstName
        validUser(req.body);

        //  converting password into hashing
        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.create(req.body);
        res.send("User Registered Successfully");
    }
    catch (err) {
        res.send("Error " + err.message);
    }
})

authrouter.post("/login", async (req, res) => {

    try {

        // validate karna

        const people = await User.findOne({ emailId: req.body.emailId });

        // if(!(req.body.emailId===people.emailId))
        //     throw new Error("Invalid credentials");

        const IsAllowed = await people.verifypassword(req.body.password);

        if (!IsAllowed)
            throw new Error("Invalid credentials");


        // jwt token 

        const token = people.getjwt();

        res.cookie("token", token);
        res.send("Login Successfully");

    }
    catch (err) {
        res.send("Error: " + err.message);
    }
})
module.exports = authrouter;