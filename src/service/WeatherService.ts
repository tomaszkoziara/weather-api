import { ITemperatureAPI } from "./TemperatureAPI";
import { IWindspeedAPI } from "./WindspeedAPI";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { DateUtils } from "../util/DateUtils";

interface IWeatherService {
    fetchTemperatures(start: Date, end: Date);
    fetchWindspeeds(start: Date, end: Date);
    fetchWeather(start: Date, end: Date);
}

/**
 * Component that provides service layer for weather API.
 */
@injectable()
class WeatherService {

    private temperatureAPI: ITemperatureAPI;
    private windspeedAPI: IWindspeedAPI;

    private AGGREGATE_CALLS_CHUNK_SIZE = 1000;

    constructor(
        @inject(TYPES.ITemperatureAPI) temperatureAPI: ITemperatureAPI,
        @inject(TYPES.IWindspeedAPI) windspeedAPI: IWindspeedAPI,
    ) {
        this.temperatureAPI = temperatureAPI;
        this.windspeedAPI = windspeedAPI;
    }

    public async fetchTemperatures(start: Date, end: Date) {
        return this.makeAggregateCall(start, end, (date: Date) => {
            return this.temperatureAPI.fetchTemperature(date);
        });
    }

    public async fetchWindspeeds(start: Date, end: Date) {
        return this.makeAggregateCall(start, end, (date: Date) => {
            return this.windspeedAPI.fetchWindspeed(date);
        });
    }

    public async fetchWeather(start: Date, end: Date) {
        const temperaturesPromise = this.fetchTemperatures(start, end);
        const windspeedsPromise = this.fetchWindspeeds(start, end);

        const temperaturesAndWindspeeds = await Promise.all([temperaturesPromise, windspeedsPromise]);

        const output = [];
        for (let i = 0; i < temperaturesAndWindspeeds[0].length; i++) {
            output.push(Object.assign(
                {},
                temperaturesAndWindspeeds[0][i],
                temperaturesAndWindspeeds[1][i])
            );
        }

        return output;
    }

    private async makeAggregateCall(start: Date, end: Date, apiCall: (date: Date) => Promise<any>) {
        const dates: Date[] = DateUtils.getRangeBetweenDates(start, end);

        const resultChunks = [];
        let promises = [];
        for (let i = 0; i < dates.length; i++) {
            promises.push(apiCall(dates[i]));
            if (promises.length >= this.AGGREGATE_CALLS_CHUNK_SIZE) {
                resultChunks.push(await Promise.all(promises));
                promises = [];
            }
        }
        if (promises.length > 0) {
            resultChunks.push(await Promise.all(promises));
        }

        const output = [];
        for (let i = 0; i < resultChunks.length; i++) {
            for (let j = 0; j < resultChunks[i].length; j++) {
                output.push(resultChunks[i][j]);
            }
        }

        return output;
    }

}

export { IWeatherService, WeatherService };