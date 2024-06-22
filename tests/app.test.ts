import express, { Request, Response } from 'express';
import path from 'path';
import request from 'supertest';

let server: any;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

describe('GET /', () => {
  beforeAll((done) => {
    server = app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 and the welcome page', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.header['content-type']).toBe('text/html; charset=UTF-8');
  });
});
