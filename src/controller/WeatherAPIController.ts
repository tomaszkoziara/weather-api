import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IWeatherService } from "../service/WeatherService";
import * as moment from 'moment';
import { APIError } from "./APIError";

interface IWeatherAPIController {

    getTemperatures(ctx);

    getWindspeeds(ctx);

    getWeather(ctx);

}

/**
 * Class that handles routes behaviour.
 */
@injectable()
class WeatherAPIController {

    private weatherService: IWeatherService;

    constructor(
        @inject(TYPES.IWeatherService) weatherService: IWeatherService
    ) {
        this.weatherService = weatherService;
    }

    async getTemperatures(ctx) {
        const start: string = ctx.query.start;
        const end: string = ctx.query.end;

        this.checkParameters(start, end);

        ctx.body = await this.weatherService.fetchTemperatures(new Date(start), new Date(end));
    }

    async getWindspeeds(ctx) {
        const start: string = ctx.query.start;
        const end: string = ctx.query.end;

        this.checkParameters(start, end);

        ctx.body = await this.weatherService.fetchWindspeeds(new Date(start), new Date(end));
    }

    async getWeather(ctx) {
        const start: string = ctx.query.start;
        const end: string = ctx.query.end;

        this.checkParameters(start, end);

        ctx.body = await this.weatherService.fetchWeather(new Date(start), new Date(end));
    }

    public checkParameters(start: string, end: string) {
        this.missingParameter(start, 'start');
        this.missingParameter(end, 'end');
        this.parameterNotISO8601(start, 'start');
        this.parameterNotISO8601(end, 'end');
    }

    private parameterNotISO8601(value: string, parameterName: string) {
        const dateAsMoment = moment(value, moment.ISO_8601);
        if (!dateAsMoment.isValid()) {
            throw new APIError(400, `Parameter ${parameterName} is not a valid ISO8601 datetime`);
        }
    }

    private missingParameter(value: any, parameterName: string) {
        if (!value) {
            throw new APIError(400, `Parameter ${parameterName} is missing`);
        }
    }

}

export { IWeatherAPIController, WeatherAPIController };