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
    try {
        const user = new User({
            name: req.param.name,
            email: req.param.email,
            password: req.param.password,
            isAdmin: req.param.isAdmin
        });
        
        const newUser = await user.save();
        res.send(newUser);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.send(user);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.delete("/:userId", async (req, res) => {
    try {
        const removedUser = await User.deleteOne({_id: req.params.userId});
        res.send(removedUser);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

module.exports = router;