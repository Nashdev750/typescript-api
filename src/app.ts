import express,{ Application } from "express";
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from "./middleware/error.middleware";
import Controller from '@/utils/interfaces/controller.interfaces';
const helmet = require('helmet');



class App{
    public express: Application;
    public port: number;

    constructor(controllers:Controller[],port:number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }   
    private initializeMiddlewares(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    } 
    private initializeControllers(controllers: Controller[]): void {
    controllers.forEach(controller => {
        this.express.use('/api',controller.router);
    });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }
     /**
     * connect to mongo database
     */
    private initializeDatabaseConnection(): void {
        const {MONGO_USER, MONGO_PASSWORD,MONGO_PATH} = process.env;
        mongoose.connect(
            `mongodb://${MONGO_USER}${MONGO_PASSWORD}${MONGO_PATH}`
        );
    }
    /**
     * start application
     */
    public listen(): void {
        this.express.listen(this.port,()=>console.log(`listening to port ${this.port}`));
    }
    
}

export default App;