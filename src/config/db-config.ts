import debug from 'debug';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../../generated/prisma/client.ts';
import { env } from './env.ts';

const log = debug(`${env.PROJECT_NAME}:configDB`);
log('Loading database connection...');

export const connectDB = async () => {
    const adapter = new PrismaPg({
        user: env.PGUSER,
        password: env.PGPASSWORD,
        host: env.PGHOST,
        port: env.PGPORT,
        database: env.PGDATABASE,
    });

    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.$connect();
        log('Database connection established successfully');
        const [info] = (await prisma.$queryRaw`SELECT current_database()`) as {
            current_database: string;
        }[];
        log('Connected to DB:', info?.current_database);
        prisma.$disconnect();
    } catch (error) {
        log('Error connecting to DB ->', error);
        throw error;
    }

    return prisma;
};
