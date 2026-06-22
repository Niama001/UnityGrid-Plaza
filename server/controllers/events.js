import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM events WHERE location_id = $1', [id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM events WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export { getAllEvents, getEventsByLocation, getEventById }