import { handle } from 'hono/aws-lambda';
import { createApp } from './create-app';
import { createDependencies } from './create-dependencies';

const deps = createDependencies(process.env);
const app = createApp(deps);

export const handler = handle(app);
