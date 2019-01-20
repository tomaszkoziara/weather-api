import { Container } from "inversify";
import { TYPES } from "./types";
import { App } from "./App";
import { Router } from "./Router";
import { ITemperatureAPI, TemperatureAPI } from "./service/TemperatureAPI";
import { WindspeedAPI, IWindspeedAPI } from "./service/WindspeedAPI";
import { IWeatherAPIController, WeatherAPIController } from "./controller/WeatherAPIController";
import { IWeatherService, WeatherService } from "./service/WeatherService";

// Here's container configuration. The library of choice is InversifyJS (http://inversify.io/).

const appContainer = new Container();

appContainer.bind<App>(TYPES.App).to(App);
appContainer.bind<Router>(TYPES.Router).to(Router);

appContainer.bind<IWeatherAPIController>(TYPES.IWeatherAPIController).to(WeatherAPIController);

appContainer.bind<IWeatherService>(TYPES.IWeatherService).to(WeatherService);

appContainer.bind<ITemperatureAPI>(TYPES.ITemperatureAPI).to(TemperatureAPI);
appContainer.bind<IWindspeedAPI>(TYPES.IWindspeedAPI).to(WindspeedAPI);

export { appContainer };