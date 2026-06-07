import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../models/event.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch event', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }
    const event = await createEvent(title, description, date, time, location, capacity || 100);
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, date, time, location, capacity } = req.body;
    const event = await updateEvent(req.params.id, title, description, date, time, location, capacity);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event updated successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update event', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteEvent(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
});

export default router;
