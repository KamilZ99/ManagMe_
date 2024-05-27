import express from 'express';
import Task from '../models/Task';
import { verifyToken } from '../middleware/auth';
import { IUser } from '../models/User'; 

interface AuthenticatedRequest extends express.Request {
  user?: IUser;
}

const router = express.Router();

router.get('/:storyId', verifyToken, async (req: AuthenticatedRequest, res) => {
  const tasks = await Task.find({ storyId: req.params.storyId, ownerId: req.user?._id });
  res.json(tasks);
});

router.post('/', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { name, description, priority, storyId, estimatedTime, status, startDate, endDate } = req.body;
  const task = new Task({ 
    name, 
    description, 
    priority, 
    storyId, 
    estimatedTime, 
    status, 
    creationDate: new Date(), 
    startDate, 
    endDate, 
    ownerId: req.user?._id 
  });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  const { name, description, priority, status, startDate, endDate } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { name, description, priority, status, startDate, endDate }, { new: true });
  res.json(task);
});

router.delete('/:id', verifyToken, async (req: AuthenticatedRequest, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
