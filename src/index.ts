import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Configure CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Logger middleware
app.use(morgan('dev'));

// Determine the correct directory for serving static files
const staticDir =
  process.env.NODE_ENV === 'prod'
    ? path.join(__dirname)
    : path.join(__dirname, '..', 'public');

// Serve static files from the determined directory
app.use(express.static(staticDir));

app.get('/', (req: Request, res: Response) => {
  const indexPath =
    process.env.NODE_ENV === 'prod'
      ? path.join(__dirname, 'index.html')
      : path.join(__dirname, '..', 'public', 'index.html');

  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
