import express from 'express';
import dotenv from 'dotenv';
import articleRoutes from './routes/article.routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/articles', articleRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
