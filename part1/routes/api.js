const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DogWalkService'
});

router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT d.name AS dog_name, d.size, u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error in /api/dogs:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/walkrequests/open', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        w.request_id,
        w.requested_time,
        w.duration_minutes,
        w.location,
        d.name AS dog_name,
        u.username AS owner_username
      FROM WalkRequests w
      JOIN Dogs d ON w.dog_id = d.dog_id
      JOIN Users u ON d.owner_id = u.user_id
      WHERE w.status = 'open'
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error in /api/walkrequests/open:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/walkers/summary', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        u.username AS walker_username,
        COUNT(r.rating_id) AS total_ratings,
        ROUND(AVG(r.rating), 1) AS average_rating,
        COUNT(DISTINCT r.request_id) AS completed_walks
      FROM Users u
      LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
      WHERE u.role = 'walker'
      GROUP BY u.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error in /api/walkers/summary:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
