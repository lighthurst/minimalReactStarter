const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = path.join(__dirname, '../public');

app.use(express.json())
  .use(express.static(PUBLIC_DIR))
  .listen(PORT, () => console.log(`Server listening on port ${PORT}`));
