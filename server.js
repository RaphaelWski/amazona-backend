const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');

// const data = require ('./data');
const config = require ('./config');

const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const usersRoute = require('./routes/users')
app.use('/users', usersRoute);
const productsRoute = require('./routes/products')
app.use('/products', productsRoute);


// Routes
app.get("/", async (req, res) => {
    res.send("We're at home");
});

// MongoDB
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(
    mongodbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('connected to DB!')
).catch(error => console.log(error.reason));

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
});