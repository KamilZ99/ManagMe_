const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  try {
    const { name, description, priority, projectId, status, assignedUserId } = req.body;
    const newStory = new Story({
      name,
      description,
      priority,
      projectId,
      status,
      ownerId: req.user.id,
      assignedUserId
    });
    await newStory.save();
    res.json(newStory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const stories = await Story.find({ projectId: req.query.projectId });
    res.json(stories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, priority, status } = req.body;
    let story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: 'Story not found' });
    }

    story.name = name;
    story.description = description;
    story.priority = priority;
    story.status = status;

    await story.save();
    res.json(story);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Attempting to delete story with ID: ${req.params.id}`);
    const story = await Story.findById(req.params.id);

    if (!story) {
      console.log('Story not found');
      return res.status(404).json({ msg: 'Story not found' });
    }

    await Story.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Story removed' });
    console.log(`Story with ID: ${req.params.id} successfully deleted`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
