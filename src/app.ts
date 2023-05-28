import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from './db';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import restaurantsRoutes from './routes/restaurantsRoutes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    // set up middleware
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private routes(): void {
    // set up routes
    this.app.use('/users', userRoutes);
    this.app.use('/restaurants', restaurantsRoutes);
    this.app.use('/login', loginRoutes);
  }
}

// create an instance of the app
const app = new App().app;

// connect to the database and start listening for requests
connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
});
