// Express app entry point
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chapterRoutes = require('./routes/chapterRoutes');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/v1/chapters', chapterRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mathongo';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
