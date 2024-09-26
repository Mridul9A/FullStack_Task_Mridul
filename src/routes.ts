import express from 'express';
import redis from './redisClient';
import TaskModel from './mongoClient';

const router = express.Router();
const TASK_KEY = 'FULLSTACK_TASK_MRIDUL';

router.get('/fetchAllTasks', async (_req, res) => {
  try {
    const tasksInRedis = await redis.lrange(TASK_KEY, 0, -1);
    const tasksInMongo = await TaskModel.find({}).sort({ _id: -1 });

    res.json({
      redisTasks: tasksInRedis,
      mongoTasks: tasksInMongo.map((entry) => entry.tasks).flat(),
    });
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

export default router;
