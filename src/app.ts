import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import type { Pool } from 'pg';

import { env } from './config/env.ts';
import { animalsRouter } from './animals/router/animals-router.ts';
import { HttpError } from './errors/http-error.ts';
import { SqlError } from './errors/sql-error.ts';

export const createApp = (pool: Pool) => {
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

    app.use('/health', (_req, res) => {
        return res.json({
            status: 'ok',
            timeStamp: new Date().toISOString(),
        });
    });

    app.use('/api/animals', animalsRouter(pool));

    app.use((_req, res) => {
        res.status(404);
        res.statusMessage = 'Not Found';
        return res.json({
            message: 'Resource not found',
        });
    });

    app.use(
        (
            error: unknown,
            _req: express.Request,
            res: express.Response,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _next: express.NextFunction,
        ) => {
            // if (error instanceof ZodError) {
            //     return res.status(400).json({
            //         message: error.issues[0]?.message ?? 'Bad Request',
            //         statusMessage: 'Bad Request',
            //     });
            // }

            if (error instanceof HttpError) {
                return res.status(error.status).json({
                    message: error.message,
                    statusMessage: error.statusMessage,
                });
            }

            if (error instanceof SqlError) {
                const status = error.code === 'NOT_FOUND' ? 404 : 500;
                const statusMessage =
                    status === 404 ? 'Not Found' : 'Internal Server Error';

                return res.status(status).json({
                    message: error.message,
                    code: error.code,
                    sqlState: error.sqlState,
                    sqlMessage: error.sqlMessage,
                    statusMessage,
                });
            }

            return res.status(500).json({
                message: 'Internal Server Error',
                statusMessage: 'Internal Server Error',
            });
        },
    );

    return app;
};
