const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// All tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err });
  }
});

// Tasks for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user tasks', error: err });
  }
});

// Create a task
router.post('/', async (req, res) => {
  const { title, description, deadline, priority, assignedTo } = req.body;
  try {
    const newTask = new Task({ title, description, deadline, priority, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create task', error: err });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update task', error: err });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err });
  }
});

module.exports = router;