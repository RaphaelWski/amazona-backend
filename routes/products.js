const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get("/", async (req, res) => {
    res.send("We're on products");
});

router.post("/", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description
        });
        
        const newProduct = await product.save();
        res.send(newProduct);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

module.exports = router;