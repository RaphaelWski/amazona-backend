const mongoose = require ('mongoose'), Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    image: {
        type : String,
        default: '/images/default.jpg',
        required : true
    },
    brand: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        default: 0,
        required : true
    },
    category: {
        type : Schema.Types.ObjectId, 
        ref: 'Categories',
        required : true
    },
    countInStock: {
        type : Number,
        default: 0,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    rating: {
        type : Number,
        default: 0,
        required : true
    },
    numReviews: {
        type : Number,
        default: 0,
        required : true
    }
})

module.exports = mongoose.model('Products', ProductSchema);