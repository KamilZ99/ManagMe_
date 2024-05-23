"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/project.ts
const express_1 = __importDefault(require("express"));
const Project_1 = __importDefault(require("../models/Project"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', auth_1.verifyToken, async (req, res) => {
    try {
        const projects = await Project_1.default.find({ ownerId: req.user?._id });
        res.json(projects);
    }
    catch (error) {
        res.status(500).send('Error fetching projects');
    }
});
router.post('/', auth_1.verifyToken, async (req, res) => {
    const { name, description } = req.body;
    const project = new Project_1.default({ name, description, ownerId: req.user?._id });
    try {
        await project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).send('Error creating project');
    }
});
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    const { name, description } = req.body;
    try {
        const project = await Project_1.default.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        res.json(project);
    }
    catch (error) {
        res.status(500).send('Error updating project');
    }
});
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        await Project_1.default.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).send('Error deleting project');
    }
});
exports.default = router;
