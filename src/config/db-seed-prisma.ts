import debug from 'debug';

import { env } from './env.ts';
import { connectDB } from './db-config.ts';

const log = debug(`${env.PROJECT_NAME}:seed`);
log('Loading seed...');
export const seed = async () => {
    log('Seeding database...');
    const prisma = await connectDB();

    try {
        await prisma.animal.deleteMany();
        await prisma.animal.createMany({
            data: [
                {
                    name: 'Guepardo',
                    englishName: 'Cheetah',
                    sciName: 'Acinonyx jubatus',
                    diet: 'Carnívoro',
                    lifestyle: 'Diurno',
                    location: 'África',
                    slogan: 'El mamífero terrestre más rápido del mundo',
                    group: 'Felinos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cheetah_%28Acinonyx_jubatus%29_female_2.jpg/640px-Cheetah_%28Acinonyx_jubatus%29_female_2.jpg',
                },
                {
                    name: 'Elefante',
                    englishName: 'Elephant',
                    sciName: 'Loxodonta africana',
                    diet: 'Herbívoro',
                    lifestyle: 'Diurno',
                    location: 'África',
                    slogan: 'El gigante gentil de la sabana',
                    group: 'Proboscídeos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/African_elephant_%28Loxodonta_africana%29_2.jpg/640px-African_elephant_%28Loxodonta_africana%29_2.jpg',
                },
                {
                    name: 'Jirafa',
                    englishName: 'Giraffe',
                    sciName: 'Giraffa camelopardalis',
                    diet: 'Herbívoro',
                    lifestyle: 'Diurno',
                    location: 'África',
                    slogan: 'El mamífero terrestre más alto del mundo',
                    group: 'Rumiantes',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/640px-Giraffe_Mikumi_National_Park.jpg',
                },
                {
                    name: 'Tigre',
                    englishName: 'Tiger',
                    sciName: 'Panthera tigris',
                    diet: 'Carnívoro',
                    lifestyle: 'Diurno',
                    location: 'Asia',
                    slogan: 'El felino más grande del mundo',
                    group: 'Felinos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Bengal_tiger_%28Panthera_tigris_tigris%29_female.jpg/640px-Bengal_tiger_%28Panthera_tigris_tigris%29_female.jpg',
                },
                {
                    name: 'Canguro',
                    englishName: 'Kangaroo',
                    sciName: 'Macropus rufus',
                    diet: 'Herbívoro',
                    lifestyle: 'Diurno',
                    location: 'Australia',
                    slogan: 'El saltarín del outback australiano',
                    group: 'Marsupiales',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kangaroo_Australia_01.jpg/640px-Kangaroo_Australia_01.jpg',
                },
                {
                    name: 'Panda',
                    englishName: 'Panda',
                    sciName: 'Ailuropoda melanoleuca',
                    diet: 'Herbívoro',
                    lifestyle: 'Diurno',
                    location: 'Asia',
                    slogan: 'El oso panda de China',
                    group: 'Úrsidos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Panda_%28Ailuropoda_melanoleuca%29.jpg/640px-Panda_%28Ailuropoda_melanoleuca%29.jpg',
                },
                {
                    name: 'Águila',
                    englishName: 'Eagle',
                    sciName: 'Aquila chrysaetos',
                    diet: 'Carnívoro',
                    lifestyle: 'Diurno',
                    location: 'América del Norte',
                    slogan: 'El ave de presa más grande del mundo',
                    group: 'Accipitriformes',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Eagle_%28Aquila_chrysaetos%29.jpg/640px-Eagle_%28Aquila_chrysaetos%29.jpg',
                },
                {
                    name: 'León',
                    englishName: 'Lion',
                    sciName: 'Panthera leo',
                    diet: 'Carnívoro',
                    lifestyle: 'Diurno',
                    location: 'África',
                    slogan: 'El rey de la sabana',
                    group: 'Felinos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Lion_%28Panthera_leo%29.jpg/640px-Lion_%28Panthera_leo%29.jpg',
                },
                {
                    name: 'Pingüino',
                    englishName: 'Penguin',
                    sciName: 'Spheniscidae',
                    diet: 'Carnívoro',
                    lifestyle: 'Diurno',
                    location: 'Antártida',
                    slogan: 'El pájaro nadador del continente blanco',
                    group: 'Pinguinos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Penguin_%28Spheniscidae%29.jpg/640px-Penguin_%28Spheniscidae%29.jpg',
                },
                {
                    name: 'Oso Polar',
                    englishName: 'Polar Bear',
                    sciName: 'Ursus maritimus',
                    diet: 'Carnívoro',
                    lifestyle: 'Diurno',
                    location: 'Ártico',
                    slogan: 'El oso más grande del mundo',
                    group: 'Úrsidos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Polar_Bear_%28Ursus_maritimus%29.jpg/640px-Polar_Bear_%28Ursus_maritimus%29.jpg',
                },
                {
                    name: 'Cebra',
                    englishName: 'Zebra',
                    sciName: 'Equus zebra',
                    diet: 'Herbívoro',
                    lifestyle: 'Diurno',
                    location: 'África',
                    slogan: 'El caballo de la sabana',
                    group: 'Perisodáctilos',
                    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Zebra_%28Equus_zebra%29.jpg/640px-Zebra_%28Equus_zebra%29.jpg',
                },
            ],
        });
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
};
