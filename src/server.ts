import express from 'express';
import http from 'http';
import cors from 'cors';
// import routes from './routes';

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
    // routes.forEach((route: any) => {
    //   console.log(route);
    // })
    this.server.use('/', (req, res, next) => {
      res.json({
        message: 'ok',
      })
    })
  }

  public start(): http.Server {
    const PORT = process.env.NODE_ENV === 'local' ? 3001 : 3000;
    return this.server.listen(PORT, () => {
        console.log(`Server start on port ${PORT}`);
    });
  }
}