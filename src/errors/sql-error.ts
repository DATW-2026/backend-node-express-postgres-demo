import debug from 'debug';
import { env } from '../config/env.ts';

const log = debug(`${env.PROJECT_NAME}:sql-error`);
log('Loading SQL error class...');

type SqlErrorOptions = {
    code?: string;
    errno?: number;
    sqlMessage?: string;
    sqlState?: string;
} & ErrorOptions;

export class SqlError extends Error {
    code: string;
    sqlMessage: string;
    sqlState: string;
    errno: number;
    constructor(message: string | undefined, options?: SqlErrorOptions) {
        super(message, options);
        this.name = 'SqlError';
        this.code = options?.code || '';
        this.errno = options?.errno || 0;
        this.sqlMessage = options?.sqlMessage || '';
        this.sqlState = options?.sqlState || '';
    }
}
