const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');
const app = express();

// const data = require ('./data');
const config = require ('./config');

dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get("/", async (req, res) => {
    res.send("We're at home");
});

// Import Routes
const usersRoute = require('./routes/users')
app.use('/users', usersRoute);
const categoriesRoute = require('./routes/categories')
app.use('/categories', categoriesRoute);
const productsRoute = require('./routes/products')
app.use('/products', productsRoute);

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