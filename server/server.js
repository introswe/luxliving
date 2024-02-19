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
const accountRoute = require('./routes/account'); 
const loginRoute = require('./routes/login');
const ordersRoute = require('./routes/orders');
const cartRoute = require('./routes/cart');
const signUpRoute = require('./routes/signup');
const bedroomRoute = require('./routes/bedroom');
const furnitureRoute = require('./routes/furniture');
const livingroomRoute = require('./routes/livingroom');
const storageRoute = require('./routes/storage');

// Use Routes
app.use('/', homeRoute);
app.use('/products', productsRoute);
app.use('/account', accountRoute);
app.use('/login', loginRoute);
app.use('/orders', ordersRoute);
app.use('/cart', cartRoute);
app.use('/signup', signUpRoute);
app.use('/bedroom', bedroomRoute);
app.use('/furniture', furnitureRoute);
app.use('/livingroom', livingroomRoute);
app.use('/storage', storageRoute);

// Starts Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});