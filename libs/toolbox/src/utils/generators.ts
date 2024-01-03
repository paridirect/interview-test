import { faker } from '@faker-js/faker';

export const randomWord = () => faker.lorem.word();
export const randomSentence = () => faker.lorem.sentence();
export const randomInt = (opt?: { min?: number; max?: number }) => faker.number.int(opt);
export const randomDate = (opt: { from: Date; to: Date }) => faker.date.between(opt);
