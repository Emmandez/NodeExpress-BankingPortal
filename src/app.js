const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));