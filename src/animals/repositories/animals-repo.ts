import debug from 'debug';

import { env } from '../../config/env.ts';
import { Prisma, PrismaClient } from '../../../generated/prisma/client.ts';
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

        try {
            const result = await this.#prisma.animal.findMany();

            return result;
        } catch (error) {
            log('Error occurred while reading all animals:', error);
            throw new SqlError('Failed to read animals', {
                code: 'READ_FAILED',
                sqlState: 'READ_FAILED',
                sqlMessage: 'An error occurred while reading animals',
            });
        }
    }

    async readAnimalById(id: number): Promise<Animal> {
        log(`Reading animal with id ${id} from database...`);

        const result = await this.#prisma.animal.findUnique({
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

        try {
            const result = await this.#prisma.animal.create({
                data: animal as AnimalCreateDTO,
            });

            return result as unknown as Animal;
        } catch (error) {
            const isNotFound =
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2025';
            throw new SqlError(`...`, {
                code: isNotFound ? 'NOT_FOUND' : 'UPDATE_FAILED',
                sqlState: isNotFound ? 'NOT_FOUND' : 'UPDATE_FAILED',
                sqlMessage: `An error occurred while creating the animal`,
                cause: error,
            });
        }
    }

    async updateAnimal(
        id: number,
        animalData: AnimalUpdateDTO,
    ): Promise<Animal> {
        log(`Updating animal with id ${id}...`);

        const data = Object.fromEntries(
            Object.entries(animalData).filter(
                ([, value]) => value !== undefined,
            ),
        ) as Prisma.AnimalUpdateInput;

        try {
            const result = await this.#prisma.animal.update({
                where: {
                    id: id,
                },
                data,
            });

            return result as unknown as Animal;
        } catch (error) {
            throw new SqlError(`Failed to update animal with id ${id}`, {
                code: 'NOT_FOUND',
                sqlState: 'UPDATE_FAILED',
                sqlMessage: `An error occurred while updating the animal with id ${id}`,
                cause: error,
            });
        }
    }

    async deleteAnimal(id: number): Promise<Animal> {
        log(`Deleting animal with id ${id}...`);

        try {
            const result = await this.#prisma.animal.delete({
                where: {
                    id: id,
                },
            });

            return result as unknown as Animal;
        } catch (error) {
            throw new SqlError(`Failed to delete animal with id ${id}`, {
                code: 'NOT_FOUND',
                sqlState: 'DELETE_FAILED',
                sqlMessage: `An error occurred while deleting the animal with id ${id}`,
                cause: error,
            });
        }
    }
}
