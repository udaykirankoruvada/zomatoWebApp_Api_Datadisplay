const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3001;

app.use(cors());

// Database setup
const dbPath = "F:/industryready_enhance42/zomato/task-udaykirankoruvada/zomato.db";
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Endpoint: Get Restaurant by ID
app.get('/restaurant/:id', (req, res) => {
  const restaurantId = req.params.id;
  const query = 'SELECT * FROM zomato_restaurants WHERE Restaurant_ID = ?';

  db.get(query, [restaurantId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(row);
    }
  });
});


// Endpoint: Get List of Restaurants with Pagination
app.get('/restaurants', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM zomato_restaurants LIMIT ? OFFSET ?';

  db.all(query, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Closed the database connection.');
    }
    process.exit(0);
  });
});
