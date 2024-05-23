// routes/project.ts
import express from 'express';
import Project from '../models/Project';
import { verifyToken } from '../middleware/auth';

interface AuthenticatedRequest extends express.Request {
  user?: {
    _id: string;
  };
}

const router = express.Router();

router.get('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    const projects = await Project.find({ ownerId: req.user?._id });
    res.json(projects);
  } catch (error) {
    res.status(500).send('Error fetching projects');
  }
});

router.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { name, description } = req.body;
  const project = new Project({ name, description, ownerId: req.user?._id });
  try {
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).send('Error creating project');
  }
});

router.put('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { name, description } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.status(500).send('Error updating project');
  }
});

router.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Error deleting project');
  }
});

export default router;
