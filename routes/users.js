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
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
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

router.patch("/:userId", async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: { 
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
            }
        });
        res.send(updatedUser);
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