"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Story_1 = __importDefault(require("../models/Story"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/:projectId', auth_1.verifyToken, async (req, res) => {
    const stories = await Story_1.default.find({ projectId: req.params.projectId, ownerId: req.user?._id });
    res.json(stories);
});
router.post('/', auth_1.verifyToken, async (req, res) => {
    const { name, description, priority, projectId, status } = req.body;
    const story = new Story_1.default({ name, description, priority, projectId, creationDate: new Date(), status, ownerId: req.user?._id });
    await story.save();
    res.status(201).json(story);
});
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    const { name, description, priority, status } = req.body;
    const story = await Story_1.default.findByIdAndUpdate(req.params.id, { name, description, priority, status }, { new: true });
    res.json(story);
});
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    await Story_1.default.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});
exports.default = router;
