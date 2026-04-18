import * as z from 'zod';

export const AnimalSchema = z.object({
    id: z.string(),
    name: z.string().nonempty(),
    englishName: z.string().nonempty(),
    sciName: z.string().nonempty(),
    group: z.string().nonempty(),
    image: z.string().url(),
    diet: z.string(),
    lifestyle: z.enum(['Diurno', 'Nocturno']),
    location: z.string(),
    slogan: z.string(),
});

export const AnimalSchemaDTO = z.object({
    name: z.string().nonempty(),
    englishName: z.string().nonempty(),
    sciName: z.string().nonempty(),
    group: z.string().nonempty(),
    image: z.string().url(),
    diet: z.string(),
    lifestyle: z.enum(['Diurno', 'Nocturno']),
    location: z.string(),
    slogan: z.string(),
});

export type Animal = z.infer<typeof AnimalSchema>;
export type AnimalDTO = Omit<Animal, 'id'>;
export type AnimalUpdateDTO = Partial<Omit<Animal, 'id'>>;
