"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Task_1 = __importDefault(require("../models/Task"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/:storyId', auth_1.verifyToken, async (req, res) => {
    const tasks = await Task_1.default.find({ storyId: req.params.storyId, ownerId: req.user?._id });
    res.json(tasks);
});
router.post('/', auth_1.verifyToken, async (req, res) => {
    const { name, description, priority, storyId, estimatedTime, status, startDate, endDate } = req.body;
    const task = new Task_1.default({
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
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    const { name, description, priority, status, startDate, endDate } = req.body;
    const task = await Task_1.default.findByIdAndUpdate(req.params.id, { name, description, priority, status, startDate, endDate }, { new: true });
    res.json(task);
});
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    await Task_1.default.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});
exports.default = router;
