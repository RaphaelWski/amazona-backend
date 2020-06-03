const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
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

router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        res.send(product);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.patch("/:productId", async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            {_id: req.params.productId},
            {$set: { 
                name: req.body.name,
                description: req.body.description,
            }
        });
        res.send(updatedProduct);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

router.delete("/:productId", async (req, res) => {
    try {
        const removedProduct = await Product.deleteOne({_id: req.params.productId});
        res.send(removedProduct);
    } catch(error) {
        res.send("ERROR: " + {message:error});
    }
});

module.exports = router;