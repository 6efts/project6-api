const express = require('express');
const app = express();
const port = 8000;
require('dotenv').config()

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_STRING);

const ItemRouter = require('./routes/items.js');
// const PurchaseRouter = require('./routes/purchases.js');
const UserRouter = require('./routes/users.js');

app.get('/', (request, response) => {
  response.send(`Welcome`);
});

app.use('/api/items', ItemRouter);

app.use('/api/users', UserRouter);

// app.use('/api/purchases', PurchaseRouter);

app.listen(port, () => {
  console.log(`Express App is live at port ${port}`);
});
