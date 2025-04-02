import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mbtiRoutes from './routes/mbti.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/mbti', mbtiRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
