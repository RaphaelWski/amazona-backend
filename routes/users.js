const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Util = require('../util');

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

router.post("/signin", async (req, res) => {
    try {
        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if(signinUser) {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: Util.getToken(signinUser)
            })
        } else {
            res.status(401).send({msg:'Invalid Email or Password'});
        }
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const newUser = await User.save();
        if(newUser) {
            res.send({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: Util.getToken(newUser)
            })
        } else {
            res.status(401).send({msg:'Invalid User data'});
        }
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

router.put("/:userId", async (req, res) => {
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