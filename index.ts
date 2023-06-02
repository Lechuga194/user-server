import express, { type Express } from 'express';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT ?? '3000';

// Middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`[server]: Server running at http://localhost:${port}`);
});
