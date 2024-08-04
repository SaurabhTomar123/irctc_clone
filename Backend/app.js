const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(
    express.urlencoded({
      extended: true,
    })
  );

// Import routes
const authRoutes = require('./routes/auth');
const trainRoutes = require('./routes/trains');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);



app.get('/', (req, res) => {
    res.send('Hello Server!');
  });
  
  app.get('/about', (req, res) => {
    res.send('About page');
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node Server is running on port ${PORT}.`);
});