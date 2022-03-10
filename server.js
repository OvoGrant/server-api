require('dotenv').config()
const express = require("express");
const app = express()
const cors = require("cors")


const port = process.env.PORT || 80;

app.use(express.json());
app.use(cors())
// get driver connection
const stocksRouter = require('./Routes/stocks');
const nlpRouter = require('./Routes/nlp')
const inventoryRouter = require('./Routes/watchlist')
app.use('/stocks',stocksRouter);
app.use('/watchlist',inventoryRouter);
app.use('/nlp',nlpRouter);


app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
}); 