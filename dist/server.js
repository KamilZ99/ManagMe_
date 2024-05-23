"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const User_1 = __importDefault(require("./models/User"));
const project_1 = __importDefault(require("./routes/project"));
const story_1 = __importDefault(require("./routes/story"));
const task_1 = __importDefault(require("./routes/task"));
const app = (0, express_1.default)();
const port = 3000;
const saltRounds = 10;
const dbUsername = encodeURIComponent('root');
const dbPassword = encodeURIComponent('tAZRkQjGiaxQbMIs');
const dbName = 'managme';
const dbUri = `mongodb://${dbUsername}:${dbPassword}@173.249.41.29:27017/${dbName}?authSource=admin`;
mongoose_1.default.connect(dbUri, {})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Could not connect to MongoDB", err));
const tokenSecret = process.env.TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        if (await User_1.default.findOne({ username })) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const newUser = new User_1.default({ username, password: hashedPassword, email, dateCreated: new Date(), role: 'user' });
        await newUser.save();
        res.status(201).send('User registered successfully');
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
});
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User_1.default.findOne({ username });
    if (!user || !await bcrypt_1.default.compare(password, user.password)) {
        return res.status(401).send('Invalid username or password');
    }
    const userId = user._id.toString();
    const token = generateToken(userId, tokenSecret, '15m');
    const refreshToken = generateToken(userId, refreshTokenSecret, '7d');
    refreshTokens.push(refreshToken);
    res.status(200).send({ token, refreshToken, user: { id: userId, email: user.email, username: user.username, role: user.role } });
});
app.post('/refresh-token', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).send('Refresh token is not valid');
    }
    try {
        const payload = jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret);
        const newToken = generateToken(payload.id, tokenSecret, '15m');
        const newRefreshToken = generateToken(payload.id, refreshTokenSecret, '7d');
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        refreshTokens.push(newRefreshToken);
        res.status(200).send({ token: newToken, refreshToken: newRefreshToken });
    }
    catch (error) {
        return res.status(403).send('Refresh token is not valid');
    }
});
app.use('/projects', project_1.default);
app.use('/stories', story_1.default);
app.use('/tasks', task_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
function generateToken(userId, secret, expiresIn) {
    return jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn });
}
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.sendStatus(403);
    jsonwebtoken_1.default.verify(token, tokenSecret, (err, user) => {
        if (err)
            return res.status(401).send(err.message);
        req.user = user;
        next();
    });
}
