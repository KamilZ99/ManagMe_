const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const Notification = require('../models/Notification'); 


router.post('/', auth, async (req, res) => {
  try {
    const { name, description, assignedUserId } = req.body;
    const newProject = new Project({
      name,
      description,
      ownerId: req.user.id,
      assignedUserId
    });
    await newProject.save();

    if (assignedUserId) {
      const notification = new Notification({
        userId: assignedUserId,
        message: `You have been assigned to a new project: ${name}`
      });
      await notification.save();
    }

    res.json(newProject);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ ownerId: req.user.id }, { assignedUserId: req.user.id }]
    });
    res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description, assignedUserId } = req.body;
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.name = name;
    project.description = description;
    project.assignedUserId = assignedUserId;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    console.log(`Delete request received for project ID: ${req.params.id}`);
    const project = await Project.findById(req.params.id);

    if (!project) {
      console.log('Project not found');
      return res.status(404).json({ msg: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ msg: 'Project removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
