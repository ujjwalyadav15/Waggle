require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const datasetRouter = require('./router/datasetRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS with specific origin for security
app.use(cors({
  origin: ['http://localhost:3000', 'https://waggle-one.vercel.app']
}));

// Middlewares
app.use(express.json());
app.use('/user', userRouter);
app.use('/dataset', datasetRouter);

// Main test route
app.get('/', (req, res) => {
  res.send('Waggle backend is connected and running! 🐝');
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

