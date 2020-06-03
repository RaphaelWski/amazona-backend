const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Raphael',
            email: "raphael.wojciechowski2@gmail.com",
            password: "password",
            isAdmin: true
        });
        
        const newUser = await user.save();
        res.send(newUser);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.post("/", async (req, res) => {
    console.log(req.body);
    // const product = req.body
    res.send("Created a new user");
});

module.exports = router;