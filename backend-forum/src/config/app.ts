import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from '../routes/auth.route.js';
import threadRoutes from '../routes/thread.route.js';
import postRoutes from '../routes/post.route.js';
import { errorHandler, notFound } from '../app/middlewares/global/errorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/threads', threadRoutes);
app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error handling middleware (harus di akhir)
app.use(notFound);
app.use(errorHandler);

export default app;
