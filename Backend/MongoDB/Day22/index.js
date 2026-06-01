const express = require("express");
const app = express();
const main = require("./database");
const User = require("./Models/users")
const validUser = require("./utils/validateuser")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const userAuth = require("./middleware/userAuth");
const authrouter = require("./routes/auth");
const userrouter = require("./routes/user");
const commentrouter = require("./routes/comment");

app.use(express.json());
app.use(cookieParser())

app.use("/auth", authrouter);
app.use("/user", userrouter);
app.use("/comment", commentrouter)

main()
    .then(async () => {
        console.log("Connected to DB")
        app.listen(process.env.PORT, () => {
            console.log("Listening at port " + process.env.PORT);
        })
    })
    .catch((err) => console.log(err));



