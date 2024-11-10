const express = require('express');
const mongoose = require('mongoose');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/files', fileRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => console.error('MongoDB connection error:', err));

module.exports = app;
