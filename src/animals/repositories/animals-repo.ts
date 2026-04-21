import debug from 'debug';

import { env } from '../../config/env.ts';
import { PrismaClient } from '../../../generated/prisma/client.ts';
import { SqlError } from '../../errors/sql-error.ts';
import type {
    Animal,
    AnimalCreateDTO,
    AnimalUpdateDTO,
} from '../schemas/animal.ts';

const log = debug(`${env.PROJECT_NAME}:repo:animals`);
log('Loading animals repository...');

export class AnimalsRepo {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        log('Starting animals repository...');
        this.#prisma = prisma;
    }

    async readAllAnimals() {
        log('Reading all animals from database...');
        const result = await this.#prisma.animals.findMany();

        return result;
    }

    async readAnimalById(id: number): Promise<Animal> {
        log(`Reading animal with id ${id} from database...`);

        const result = await this.#prisma.animals.findUnique({
            where: { id: id },
        });

        if (!result) {
            throw new SqlError(`Animal with id ${id} not found`, {
                code: 'NOT_FOUND',
                sqlState: 'READ_FAILED',
                sqlMessage: `No animal found with id ${id}`,
            });
        }

        return result as unknown as Animal;
    }

    async createAnimal(animal: AnimalCreateDTO): Promise<Animal> {
        log(`Creating animal with name ${animal.name}...`);

        const result = await this.#prisma.animals.create({
            data: animal as AnimalCreateDTO,
        });

        return result as unknown as Animal;
    }

    async updateAnimal(
        id: number,
        animalData: AnimalUpdateDTO,
    ): Promise<Animal> {
        log(`Updating animal with id ${id}...`);

        const result = await this.#prisma.animals.update({
            where: {
                id: id,
            },
            data: animalData as AnimalUpdateDTO,
        });

        if (!result) {
            throw new SqlError(`Animal with id ${id} not found`, {
                code: 'NOT_FOUND',
                sqlState: 'UPDATE_FAILED',
                sqlMessage: `No animal found with id ${id}`,
            });
        }

        return result as unknown as Animal;
    }

    async deleteAnimal(id: number): Promise<Animal> {
        log(`Deleting animal with id ${id}...`);
        const q = `
            DELETE FROM animals 
            WHERE id = $1 
            RETURNING 
                id, 
                name, 
                english_name AS "englishName", 
                sci_name AS "sciName", 
                diet, 
                lifestyle, 
                location, 
                slogan, 
                group_name AS "group", 
                image`;
        const { rows } = await this.pool.query<Animal>(q, [id]);

        if (rows.length === 0) {
            throw new SqlError(`Animal with id ${id} not found`, {
                code: 'NOT_FOUND',
                sqlState: 'DELETE_FAILED',
                sqlMessage: `No animal found with id ${id}`,
            });
        }

        return rows[0] as Animal;
    }
}
