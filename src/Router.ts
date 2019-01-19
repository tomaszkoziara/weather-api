import * as koaRouter from 'koa-router';
import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { ITemperatureAPI } from './service/TemperatureAPI';
import { IWindspeedAPI } from './service/WindspeedAPI';
import { IWeatherAPIController } from './controller/WeatherAPIController';

@injectable()
class Router {

    private weatherAPIController: IWeatherAPIController;

    constructor(
        @inject(TYPES.IWeatherAPIController) weatherAPIController: IWeatherAPIController
    ) {
        this.weatherAPIController = weatherAPIController;
    }

    build() {
        const router = new koaRouter();

        // Just to check if service is up and running during development or in bigger context (heartbeat)
        router.get('/ping', (ctx) => {
            ctx.response.body = 'pong!';
        });

        router.get('/temperatures', async (ctx) => {
            await this.weatherAPIController.getTemperatures(ctx);
        });

        router.get('/speeds', async (ctx) => {
            await this.weatherAPIController.getWindspeeds(ctx);
        });

        router.get('/weather', async (ctx) => {
            await this.weatherAPIController.getWeather(ctx);
        });

        return router;
    }

}

export { Router };