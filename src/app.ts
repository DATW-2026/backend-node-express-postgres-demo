import debug from 'debug';
import express from 'express';
import type { Pool } from 'pg';

import { env } from './config/env.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createApp = (pool: Pool) => {
    const log = debug(`${env.PROJECT_NAME}:app`);
    log('Starting Express app...');
    const app = express();

    // pool

    return app;
};
