import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouters } from './app/modules/user.router';
const app = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
