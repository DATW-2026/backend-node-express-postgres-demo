import debug from 'debug';
import { env } from '../../config/env.ts';
import type { AnimalsRepo } from '../repositories/animals-repo.ts';
import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../errors/http-error.ts';
import type { AnimalCreateDTO, AnimalUpdateDTO } from '../schemas/animal.ts';
import { SqlError } from '../../errors/sql-error.ts';

const log = debug(`${env.PROJECT_NAME}:controller:animals`);
log('Starting animals controller...');

export class AnimalsController {
    private repo: AnimalsRepo;
    constructor(repo: AnimalsRepo) {
        this.repo = repo;
    }

    async getAllAnimals(_req: Request, res: Response, next: NextFunction) {
        log('Getting all animals from repository...');
        try {
            const animals = await this.repo.readAllAnimals();
            res.json(animals);
        } catch (error: unknown) {
            if (error instanceof SqlError) {
                next(error);

                return;
            }

            next(
                new HttpError(
                    500,
                    'Internal Server Error',
                    'An error occurred while fetching animals',
                    { cause: error },
                ),
            );
        }
    }

    async getAnimalById(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        // id Validado por el middleware de validación
        log(`Getting animal with id ${id} from repository...`);
        try {
            const animal = await this.repo.readAnimalById(id);

            res.json(animal);
        } catch (error: unknown) {
            if (error instanceof SqlError) {
                next(error);

                return;
            }

            const httpError = new HttpError(
                500,
                'Internal Server Error',
                'An error occurred while fetching animal',
                { cause: error },
            );
            next(httpError);

            return;
        }
    }

    async createAnimal(req: Request, res: Response, next: NextFunction) {
        log('Creating new animal in repository...');
        try {
            const animalData = req.body as AnimalCreateDTO;
            const animal = await this.repo.createAnimal(animalData);
            res.status(201).json(animal);
        } catch (error: unknown) {
            if (error instanceof SqlError) {
                next(error);

                return;
            }

            const httpError = new HttpError(
                500,
                'Internal Server Error',
                'An error occurred while creating animal',
                { cause: error },
            );
            next(httpError);

            return;
        }
    }

    async updateAnimal(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        // id Validado por el middleware de validación
        log(`Updating animal with id ${id} in repository...`);
        try {
            const animalData = req.body as AnimalUpdateDTO;
            const animal = await this.repo.updateAnimal(id, animalData);

            res.json(animal);
        } catch (error: unknown) {
            if (error instanceof SqlError) {
                next(error);
                return;
            }

            const httpError = new HttpError(
                500,
                'Internal Server Error',
                'An error occurred while updating animal',
                { cause: error },
            );
            next(httpError);

            return;
        }
    }

    async deleteAnimal(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        log(`Deleting animal with id ${id} from repository...`);
        try {
            await this.repo.deleteAnimal(id);
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof SqlError) {
                next(error);
                return;
            }

            const httpError = new HttpError(
                500,
                'Internal Server Error',
                'An error occurred while deleting animal',
                { cause: error },
            );
            next(httpError);

            return;
        }
    }
}
