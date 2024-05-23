import express from 'express';
import Story from '../models/Story';
import { verifyToken } from '../middleware/auth';
import { IUser } from '../models/User'; 

interface AuthenticatedRequest extends express.Request {
  user?: IUser;
}

const router = express.Router();

router.get('/:projectId', verifyToken, async (req: AuthenticatedRequest, res) => {
  const stories = await Story.find({ projectId: req.params.projectId, ownerId: req.user?._id });
  res.json(stories);
});

router.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { name, description, priority, projectId, status } = req.body;
  const story = new Story({ name, description, priority, projectId, creationDate: new Date(), status, ownerId: req.user?._id });
  await story.save();
  res.status(201).json(story);
});

router.put('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { name, description, priority, status } = req.body;
  const story = await Story.findByIdAndUpdate(req.params.id, { name, description, priority, status }, { new: true });
  res.json(story);
});

router.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  await Story.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
