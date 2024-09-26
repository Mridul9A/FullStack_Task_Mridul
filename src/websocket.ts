import { Server as SocketServer, Socket } from 'socket.io';
import redis from './redisClient';
import TaskModel from './mongoClient';

const TASK_KEY = 'FULLSTACK_TASK_MRIDUL';

export const initializeWebSocket = (httpServer: any) => {
  const io = new SocketServer(httpServer, {
    cors: { origin: "*" }
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected', socket.id);

    socket.on('add', async (task: string) => {
      const tasks = await redis.lpush(TASK_KEY, task);
      const taskCount = await redis.llen(TASK_KEY);

      // If tasks exceed 50, move to MongoDB
      if (taskCount > 50) {
        const allTasks = await redis.lrange(TASK_KEY, 0, -1);
        await TaskModel.create({ tasks: allTasks });
        await redis.del(TASK_KEY);
      }

      socket.emit('taskAdded', task);
    });
  });
};
