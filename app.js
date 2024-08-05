require('dotenv').config();
require('express-async-errors'); // pkg to set up error handling instead of try / catch MW, just need to require in app.js to use

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const connectDB = require('./db/connect')

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products');

// middleware 
app.use(express.json()); // allows us to receive JSON from req.body


// routes

app.get('/', (req, res) => {
    res.status(200).send('<h1>STORE API</h1><a href="/api/v1/products">View Products</a>')
});

// products route

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
        // connect to the database
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port: ${port}`));
    } catch (err) {
        console.log(err);
    }
}

start();