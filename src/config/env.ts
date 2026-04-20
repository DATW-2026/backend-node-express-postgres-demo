import debug from 'debug';
import * as z from 'zod';
import { ZodError } from 'zod';

export const EnvSchema = z.object({
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(['dev', 'prod', 'test']),
    PROJECT_NAME: z.string(),
    DEBUG: z.string().optional(),

    PGUSER: z.string(),
    PGPASSWORD: z.string(),
    PGHOST: z.string(),
    PGPORT: z.coerce.number(),
    PGDATABASE: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

export let env: Env;
try {
    env = EnvSchema.parse(process.env);
    const log = debug(`${env.PROJECT_NAME}:env`);
    log('Loading environment variables');
} catch (error) {
    console.log(error as ZodError);
    process.exit(1);
}
