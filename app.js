const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menuRoutes');
const dbConnect = require('./config/dbConnect');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(menuRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`port:${port}`);
});
