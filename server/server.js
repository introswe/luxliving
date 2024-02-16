const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

// Configures Application
const app = express();
const PORT = 3001;
app.use(cors());
app.use(bodyParser.json());

// Routes
const homeRoute = require('./routes/home');
const productsRoute = require('./routes/products'); 

// Use Routes
app.use('/', homeRoute);
app.use('/products', productsRoute);

// Starts Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
