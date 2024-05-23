import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import 'dotenv/config';
import User from './models/User'; 
import projectRoutes from './routes/project';
import storyRoutes from './routes/story';
import taskRoutes from './routes/task';

const app = express();
const port = 3000;
const saltRounds = 10;

const dbUsername = encodeURIComponent('root');
const dbPassword = encodeURIComponent('tAZRkQjGiaxQbMIs');
const dbName = 'managme';
const dbUri = `mongodb://${dbUsername}:${dbPassword}@173.249.41.29:27017/${dbName}?authSource=admin`;

mongoose.connect(dbUri, {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Could not connect to MongoDB", err));

const tokenSecret = process.env.TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
let refreshTokens: string[] = [];

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (await User.findOne({ username })) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, password: hashedPassword, email, dateCreated: new Date(), role: 'user' });
    await newUser.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {
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
    const payload = jwt.verify(refreshToken, refreshTokenSecret) as { id: string };
    const newToken = generateToken(payload.id, tokenSecret, '15m');
    const newRefreshToken = generateToken(payload.id, refreshTokenSecret, '7d');

    refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    refreshTokens.push(newRefreshToken);

    res.status(200).send({ token: newToken, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(403).send('Refresh token is not valid');
  }
});

app.use('/projects', projectRoutes);
app.use('/stories', storyRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function generateToken(userId: string, secret: string, expiresIn: string) {
  return jwt.sign({ id: userId }, secret, { expiresIn });
}

function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, tokenSecret, (err: any, user: any) => {
    if (err) return res.status(401).send(err.message);
    req.user = user;
    next();
  });
}
