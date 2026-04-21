import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PrismaClient } from '../generated/prisma/client.ts';

import { env } from './config/env.ts';
import { AnimalsRouter } from './animals/routers/animals-router.ts';
import { HttpError } from './errors/http-error.ts';
import { errorHandler } from './middleware/error-handler.ts';
import { apiController } from './controllers/api.ts';
import { HomeView } from './views/home.ts';
import { customHeaders } from './middleware/customs.ts';
import { AnimalsRepo } from './animals/repositories/animals-repo.ts';
import { AnimalsController } from './animals/controllers/animals-controller.ts';

export const createApp = (prisma: PrismaClient) => {
    const log = debug(`${env.PROJECT_NAME}:app`);
    log('Starting Express app...');
    const app = express();

    app.disable('x-powered-by');
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: '*',
        }),
    );
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(customHeaders(env.PROJECT_NAME));
    app.use(express.static('public'));

    app.use('/health', (_req, res) => {
        return res.json({
            status: 'ok',
            timeStamp: new Date().toISOString(),
        });
    });

    app.get('/', async (_req, res) => {
        log('Received request to root endpoint');
        return res.send(await HomeView.render());
    });

    app.get('/api', apiController);

    const animalRepo = new AnimalsRepo(prisma);
    const animalController = new AnimalsController(animalRepo);
    const animalRouter = new AnimalsRouter(animalController);
    app.use('/api/animals', animalRouter.router);

    //app.use('/api/animals', AnimalsRouter(pool));

    app.use((_req, _res, next) => {
        log('Calling errorHandler for 404 error');
        const error = new HttpError(404, 'Not Found', 'Resource not found');
        next(error);
    });

    app.use(errorHandler);

    return app;
};
