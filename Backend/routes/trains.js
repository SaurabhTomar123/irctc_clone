const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to train database.');
});

// Endpoint to get train data between two stations
router.get('/between', (req, res) => {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).send('Both from and to stations are required.');
    }
    db.query(
        'SELECT * FROM trains WHERE departure = ? AND arrival = ?',
        [from, to],
        (err, results) => {
            if (err) {
                console.error('Error fetching train data:', err);
                return res.status(500).send('Server error.');
            }
            res.status(200).json(results);
        }
    );
});



///###Add the CheckAPI function call to this route
// Endpoint to create a new train (admin only) ###Strictly
router.post('/create',(req, res) => {
    const { train_name,departure, arrival, availability } = req.body;
    console.log('Received data:', req.body); // Log incoming data
    // Validate input
    if (!train_name||!departure || !arrival || availability === undefined) {
        console.error('Validation failed');
        return res.status(400).send('Departure station, arrival station, and availability are required.');
    }

    if (typeof availability !== 'number' || availability < 0) {
        console.error('Invalid availability');
        return res.status(400).send('Availability must be a non-negative integer.');
    }

    // Insert new train into the database
    db.query(
        'INSERT INTO trains (train_name, departure, arrival, availability) VALUES (?, ?, ?, ?)',
        [train_name, departure, arrival, availability],
        (err, results) => {
            if (err) {
                console.error('Error inserting new train:', err);
                return res.status(500).send('Server error.');
            }
            console.log('Train created successfully:', results);
            res.status(201).send('Train created successfully.');
        }
    );
});

// Endpoint to get all trains
router.get('/all', (req, res) => {
    console.log(res.body)
    db.query('SELECT * FROM trains', (err, results) => {
        if (err) {
            console.error('Error fetching train data:', err);
            return res.status(500).send('Server error.');
        }
        res.status(200).json(results);
    });
});



// Route to book a seat for a user 
router.post('/book', (req, res) => {
    const { user_id, train_id, seat_number } = req.body;

    if (!user_id || !train_id || !seat_number) {
        return res.status(400).send('User ID, train ID, and seat number are required.');
    }

    // Check availability of seats
    db.query('SELECT availability FROM trains WHERE id = ?', [train_id], (err, results) => {
        if (err) {
            console.error('Error querying train availability:', err);
            return res.status(500).send('Server error.');
        }

        if (results.length === 0) {
            return res.status(404).send('Train not found.');
        }

        const availableSeats = results[0].availability;
        if (availableSeats <= 0) {
            return res.status(400).send('No seats available.');
        }

        // Book the seat
        db.query('INSERT INTO bookings (user_id, train_id, seat_number) VALUES (?, ?, ?)', [user_id, train_id, seat_number], (err, results) => {
            if (err) {
                console.error('Error booking seat:', err);
                return res.status(500).send('Server error.');
            }

            // Update seat availability
            db.query('UPDATE trains SET availability = availability - 1 WHERE id = ?', [train_id], (err, results) => {
                if (err) {
                    console.error('Error updating seat availability:', err);
                    return res.status(500).send('Server error.');
                }

                res.status(201).send('Seat booked successfully.');
            });
        });
    });
});



// Route to get specific booking details for users
router.get('/booking/:id', (req, res) => {
    const bookingId = req.params.id;

    // Validate booking ID
    if (!bookingId) {
        return res.status(400).send('Booking ID is required.');
    }

    // Query booking details
    db.query(
        'SELECT bookings.id, users.username, trains.departure, trains.arrival, bookings.seat_number FROM bookings JOIN users ON bookings.user_id = users.id JOIN trains ON bookings.train_id = trains.id WHERE bookings.id = ?',
        [bookingId],
        (err, results) => {
            if (err) {
                console.error('Error querying booking details:', err);
                return res.status(500).send('Server error.');
            }

            if (results.length === 0) {
                return res.status(404).send('Booking not found.');
            }

            res.status(200).json(results[0]);
        }
    );
});






module.exports = router;