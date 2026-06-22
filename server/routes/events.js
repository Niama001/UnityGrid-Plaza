import express from 'express'
import { getAllEvents, getEventsByLocation, getEventById } from '../controllers/events.js'

const router = express.Router()

router.get('/events', getAllEvents)
router.get('/events/location/:id', getEventsByLocation)
router.get('/events/:id', getEventById)

export default router