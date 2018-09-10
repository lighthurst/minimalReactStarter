const express = require('express');
const path = require('path');
require('dotenv').config();

const PUBLIC_DIR = path.join(__dirname, '../public');
const ERROR_PAGE = path.join(__dirname, '../public/error.html');
const app = express();

app
  // Parse JSON payloads
  .use(express.json())
  // Serve the public files
  .use(express.static(PUBLIC_DIR))
  // Set up our routes

  // Handle our errors
  .use('*', express.static(ERROR_PAGE));

module.exports = app;
