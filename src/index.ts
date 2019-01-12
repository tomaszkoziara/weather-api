import 'reflect-metadata';
import { appContainer } from "./inversify.config";
import { TYPES } from "./types";

import { App } from './App';

const app = appContainer.get<App>(TYPES.App);
const port = 3000;

console.log('Starting app...');
app.run(port);
console.log(`App listening at port ${port}`);

