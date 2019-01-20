import 'reflect-metadata';
import fetch from 'node-fetch';
import { appContainer } from "./inversify.config";
import { TYPES } from "./types";

import { App } from './App';

// Setting fetch as global variable so I can switch to mock version for tests
global['fetch'] = fetch;

// App initialization
const app = appContainer.get<App>(TYPES.App);
const port = 3000;

console.log('Starting app...');
app.run(port);
console.log(`App listening at port ${port}`);