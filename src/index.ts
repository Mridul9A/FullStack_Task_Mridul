import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { createClient } from 'redis';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to Redis
const redisClient = createClient({
  url: 'redis://default:dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB@redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com:12675',
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/assignment', {
  // Remove useNewUrlParser and useUnifiedTopology for newer versions
}).catch(err => console.error('MongoDB connection error:', err));

// Define the structure of a Task
interface Task {
  id: number; // or string, based on your ID generation strategy
  text: string;
}

// Listen for incoming connections
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('add', async (task: Task) => {
    console.log('Adding task:', task);
    try {
      const reply = await redisClient.get(`FULLSTACK_TASK_<YOUR_FIRST_NAME>`);
      const tasks: Task[] = reply ? JSON.parse(reply) : [];
      tasks.push(task); // Add the new task

      if (tasks.length > 50) {
        // Logic to move tasks to MongoDB and flush Redis
        // Store in MongoDB
        // Clear Redis
      } else {
        // Store back to Redis
        await redisClient.set(`FULLSTACK_TASK_<YOUR_FIRST_NAME>`, JSON.stringify(tasks));
      }
    } catch (err) {
      console.error('Error handling task:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();



