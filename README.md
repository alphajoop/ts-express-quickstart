# ts-express-quickstart

A quickstart template for building Node.js applications using Express and TypeScript. This template includes Prettier for code formatting, Jest for unit testing, and environment configuration.

## Features

- **TypeScript**: For strong typing and better code maintenance.
- **Express**: Minimal and flexible web framework for Node.js.
- **Prettier**: For consistent code formatting.
- **Jest**: Testing framework for JavaScript with TypeScript support.
- **Supertest**: For testing HTTP endpoints.
- **CORS**: Configurable Cross-Origin Resource Sharing.
- **Helmet**: Security middleware for HTTP headers.
- **Morgan**: HTTP request logger middleware.
- **dotenv**: For environment variables management.

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 8 or higher)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/alphajoop/ts-express-quickstart.git
   ```

   ```bash
   cd ts-express-quickstart
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## npm Scripts

- `npm start`: Starts the server in development mode with `ts-node`.
- `npm run build`: Compiles the TypeScript code and copies static files to the `dist` folder.
- `npm run serve`: Starts the server in production mode from the `dist` folder.
- `npm run lint`: Runs ESLint to analyze the code.
- `npm run format`: Runs Prettier to format the code.
- `npm test`: Runs tests with Jest.
- `npm run test:watch`: Runs tests in watch mode.

## Project Structure

```arduino
ts-express-quickstart/
├── dist/
├── node_modules/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   └── index.html
├── src/
│   ├── index.ts
├── tests/
│   ├── app.test.ts
├── .env.example
├── .gitignore
├── .prettierrc
├── .prettierignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── .eslintrc.json
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# Port configuration
PORT=3000

# Allowed origins for CORS
ALLOWED_ORIGINS=http://localhost:3000,http://example.com

# Example database configuration (if needed in the future)
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=user
# DB_PASSWORD=password
# DB_NAME=database
```

For reference, a `.env.example` file is included in the repository.

### TypeScript

The TypeScript configuration is located in the `tsconfig.json` file. You can modify it according to your needs.

### ESLint

The ESLint configuration is located in the `.eslintrc.json` file. You can adjust it to adhere to your coding conventions.

### Prettier

The Prettier configuration is located in the `.prettierrc` file. Ensure that Prettier formats the code according to your preferences.

### Jest

The Jest configuration is located in the `jest.config.js` file. This file configures Jest to use `ts-jest` and includes code coverage settings.

## Example Test

An example test is located in the `tests/app.test.ts` file. This test uses `supertest` to test an endpoint of the Express application.

```typescript
import request from 'supertest';
import express, { Request, Response } from 'express';
import path from 'path';

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
```

## Deployment

To deploy your application, compile the TypeScript code and use the `serve` script to start the server in production mode:

```bash
npm run build
npm run serve
```

## Contribution

Contributions are welcome! Please submit an issue or a pull request on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
