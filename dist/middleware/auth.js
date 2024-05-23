"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const tokenSecret = process.env.TOKEN_SECRET;
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(403);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        const user = await User_1.default.findById(decoded.id);
        if (!user)
            return res.sendStatus(404);
        req.user = user;
        next();
    }
    catch (err) {
        res.sendStatus(401);
    }
};
exports.verifyToken = verifyToken;
