const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// routes 
const productRoute = require('./routers/product.route');

app.use("/api/v1/product", productRoute);

app.get('/', (req, res) => {
    console.log("Route is working")
    res.send("welcom to my server now")
});

module.exports = app;



