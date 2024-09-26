import mongoose from 'mongoose';

const mongoUrl = 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/assignment';

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

const taskSchema = new mongoose.Schema({
  tasks: [String],
});

const TaskModel = mongoose.model('assignment_mridul', taskSchema);

export default TaskModel;
