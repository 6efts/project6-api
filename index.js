const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

dotenv.config()
const mongodb = process.env.mongo_DB

const mongoose = require('mongoose');
mongoose.connect(mongodb);

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
