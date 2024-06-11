
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const storyRoutes = require('./routes/storyRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 

const app = express();


const dbUsername = encodeURIComponent('root');
const dbPassword = encodeURIComponent('tAZRkQjGiaxQbMIs');
const dbName = 'managme';
const dbUri = `mongodb://${dbUsername}:${dbPassword}@173.249.41.29:27017/${dbName}?authSource=admin`;


mongoose.connect(dbUri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Could not connect to MongoDB", err));

app.use(cors());
app.use(bodyParser.json());


app.use('/api/projects', projectRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
