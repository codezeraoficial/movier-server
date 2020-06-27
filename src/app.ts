import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import {Routes} from './routes';


class App{
  public app: express.Application;
  public routePrv: Routes = new Routes();


  constructor(){
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void{
    this.app.use(cors());
    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({extended: false}));
  }
}

export default new App().app;