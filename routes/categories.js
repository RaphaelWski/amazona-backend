const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch(error) {
        res.status(500).send("ERROR: " + {message:error});
    }
});

router.post("/", async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name
        });
        
        const newCategory = await category.save();
        if(newCategory){
            res.status(201).send({ message: 'New Category Created', data: newCategory });
        } else {
            res.status(500).send({ message: 'Error while creating Category' });
        }
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.get("/:categoryId", async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.send(category);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.put("/:categoryId", async (req, res) => {
    try {
        const updatedCategory = await Category.updateOne(
            {_id: req.params.categoryId},
            {$set: { 
                name: req.body.name,
            }
        });
        res.send(updatedCategory);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.delete("/:categoryId", async (req, res) => {
    try {
        const removedCategory = await Category.deleteOne({_id: req.params.categoryId});
        res.send(removedCategory);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

module.exports = router;