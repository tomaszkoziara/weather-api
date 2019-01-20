import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { IWeatherService, WeatherService } from '../../src/service/WeatherService';
import { ITemperatureAPI, TemperatureAPI } from '../../src/service/TemperatureAPI';
import { IWindspeedAPI, WindspeedAPI } from '../../src/service/WindspeedAPI';

describe('WeatherService', () => {

    let weatherService: WeatherService = null;

    beforeEach(() => {

        const windspeedAPI = new WindspeedAPIMock();
        const temperatureAPI = new TemperatureAPIMock();
        weatherService = new WeatherService(temperatureAPI, windspeedAPI);

        temperatureAPI.mockResponses['2000-01-01T00:00:00.000Z'] = {
            data: { temp: 1 },
            timeout: 200
        };
        temperatureAPI.mockResponses['2000-01-02T00:00:00.000Z'] = {
            data: { temp: 2 },
            timeout: 100
        };
        temperatureAPI.mockResponses['2000-01-03T00:00:00.000Z'] = {
            data: { temp: 3 },
            timeout: 10
        };

        temperatureAPI.mockResponses['2000-05-05T00:00:00.000Z'] = {
            data: { temp: 1 },
            timeout: 80
        };
        temperatureAPI.mockResponses['2000-05-06T00:00:00.000Z'] = {
            data: { temp: 2 },
            timeout: 20
        };
        temperatureAPI.mockResponses['2000-05-07T00:00:00.000Z'] = {
            data: { temp: 3 },
            timeout: 200
        };

        windspeedAPI.mockResponses['2000-05-05T00:00:00.000Z'] = {
            data: { wind: 1 },
            timeout: 200
        };
        windspeedAPI.mockResponses['2000-05-06T00:00:00.000Z'] = {
            data: { wind: 2 },
            timeout: 100
        };
        windspeedAPI.mockResponses['2000-05-07T00:00:00.000Z'] = {
            data: { wind: 3 },
            timeout: 10
        };

    });

    describe('fetchTemperatures', () => {

        it('should return ordered results even if responses from service come unordered', async () => {

            const response = await weatherService.fetchTemperatures(new Date('2000-01-01T00:00:00Z'),
                new Date('2000-01-03T00:00:00Z'));

            assert.deepEqual(response, [{ temp: 1 }, { temp: 2 }, { temp: 3 }]);

        });

    });

    describe('fetchWindspeeds', () => {

        it('should return ordered results even if responses from service come unordered', async () => {

            const response = await weatherService.fetchWindspeeds(new Date('2000-05-05T00:00:00Z'),
                new Date('2000-05-07T00:00:00Z'));

            assert.deepEqual(response, [{ wind: 1 }, { wind: 2 }, { wind: 3 }]);

        });

    });

    describe('fetchWeather', () => {

        it('should return ordered results even if responses from service come unordered', async () => {

            const response = await weatherService.fetchWeather(new Date('2000-05-05T00:00:00Z'),
                new Date('2000-05-07T00:00:00Z'));

            assert.deepEqual(response, [{
                temp: 1,
                wind: 1
            }, {
                temp: 2,
                wind: 2
            }, {
                temp: 3,
                wind: 3
            }]);

        });

    });

});

abstract class AbstractMock {

    public mockResponses: { [key: string]: any };

    constructor() {
        this.mockResponses = {};
    }

    public async fetchData(date: Date) {
        const response = this.mockResponses[date.toISOString()];

        if (response.timeout && response.timeout > 0) {
            await new Promise((resolve) => {
                setTimeout(resolve, response.timeout);
            });
            return response.data;
        }

        return response.data

    }

}

class TemperatureAPIMock extends AbstractMock implements ITemperatureAPI {

    constructor() {
        super();
    }

    public async fetchTemperature(date: Date) {
        return this.fetchData(date);
    }

}

class WindspeedAPIMock extends AbstractMock implements IWindspeedAPI {

    constructor() {
        super();
    }

    public async fetchWindspeed(date: Date) {
        return this.fetchData(date);
    }

}