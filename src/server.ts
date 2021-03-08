import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import routesV1 from 'routes/v1/routes';

export default class Server {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.loadConfigurationMiddlewares();
    this.loadRoutes();
  }

  private loadConfigurationMiddlewares(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
  }

  private loadRoutes() {

    routesV1.forEach((route: express.Router) => {
      this.server.use('/api/v1', route);
    });
    // this.server.use('/', (request: Request, response: Response) => {
    //   response.sendStatus(404);
    // });
  }

  public getServer() {
    return this.server;
  }

  public start(): http.Server {
    const PORT = process.env.NODE_ENV === 'local' ? 3001 : 3000;
    return this.server.listen(PORT, () => {
        console.log(`Server start on port ${PORT}`);
    });
  }
}