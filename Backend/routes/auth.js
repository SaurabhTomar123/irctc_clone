const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Create a connection to the user database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_db'
});

//Connecting 
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to user database.');
});

// Endpoint to register a new user
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
        return res.status(400).send('All fields are required.');
    }

    if (role !== 'admin' && role !== 'login user') {
        return res.status(400).send('Invalid role specified.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).send('Server error.');
            }
            res.status(201).send('User registered successfully.');
        }
    );
});


router.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send('Username, password, and role are required.');
    }

    let query = '';
    if (role === 'admin') {
        query = 'SELECT * FROM admins WHERE username = ? AND password = ?';
    } else {
        query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    }

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Server error.');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid credentials.');
        }

        res.status(200).json({ message: 'Login successful', role });
    });
});


app.get('/api/bookings/:bookingId', (req, res) => {
    const bookingId = req.params.bookingId;
  
    const userQuery = 'SELECT user_id FROM bookings WHERE booking_id = ?';
    const trainQuery = 'SELECT train_id FROM bookings WHERE booking_id = ?';
  
    connection.query(userQuery, [bookingId], (userError, userResults) => {
      if (userError) {
        console.error('Error fetching user ID:', userError);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      connection.query(trainQuery, [bookingId], (trainError, trainResults) => {
        if (trainError) {
          console.error('Error fetching train ID:', trainError);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.status(200).json({
          user_id: userResults[0]?.user_id,
          train_id: trainResults[0]?.train_id,
        });
      });
    });
  });
  


module.exports = router;