import { Container } from "inversify";
import { TYPES } from "./types";
import { App } from "./App";
import { Router } from "./Router";

const appContainer = new Container();

appContainer.bind<App>(TYPES.App).to(App);
appContainer.bind<Router>(TYPES.Router).to(Router);

export { appContainer };