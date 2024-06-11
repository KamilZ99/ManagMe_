const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { name, description, priority, storyId, estimatedTime, status, startDate, endDate, assignedUserId } = req.body;
    const newTask = new Task({
      name,
      description,
      priority,
      storyId,
      estimatedTime,
      status,
      startDate,
      endDate,
      ownerId: req.user.id,
      assignedUserId
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ storyId: req.query.storyId });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, priority, status, estimatedTime, startDate, endDate } = req.body;
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    task.name = name;
    task.description = description;
    task.priority = priority;
    task.status = status;
    task.estimatedTime = estimatedTime;
    task.startDate = startDate;
    task.endDate = endDate;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Attempting to delete task with ID: ${req.params.id}`);
    const task = await Task.findById(req.params.id);

    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ msg: 'Task not found' });
    }

    await Task.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Task removed' });
    console.log(`Task with ID: ${req.params.id} successfully deleted`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
