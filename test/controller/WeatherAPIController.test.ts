import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { WeatherAPIController } from '../../src/controller/WeatherAPIController';
import { IWeatherService } from '../../src/service/WeatherService';

describe('WeatherAPIController', () => {

    let weatherService: WeatherServiceMock = null;

    const callMethodOnMockAndGetError = async (methodName: string, ctx) => {
        const weatherController = new WeatherAPIController(weatherService);

        let caughtError = null;

        try {
            await weatherController[methodName](ctx);
        } catch (error) {
            caughtError = error;
        }

        return caughtError;
    }

    beforeEach(() => {
        weatherService = new WeatherServiceMock();
    });

    describe('getTemperatures', () => {

        it('should throw an error if a parameter is missing', async () => {

            const endError = await callMethodOnMockAndGetError('getTemperatures', {
                query: {
                    start: 'xxx'
                }
            });

            const startError = await callMethodOnMockAndGetError('getTemperatures', {
                query: {
                    end: 'xxx'
                }
            });

            assert.equal(startError.message, 'Parameter start is missing');
            assert.equal(endError.message, 'Parameter end is missing');

        });

        it('should throw an error if a parameter is not formatted correctly', async () => {

            const startError = await callMethodOnMockAndGetError('getTemperatures', {
                query: {
                    start: '2018-1-1T00:00:00Z',
                    end: '2018-01-01T00:00:00Z'
                }
            });

            const endError = await callMethodOnMockAndGetError('getTemperatures', {
                query: {
                    start: '2018-01-01T00:00:00Z',
                    end: '2018-1-1T00:00:00Z'
                }
            });

            assert.equal(startError.message, 'Parameter start is not a valid ISO8601 datetime');
            assert.equal(endError.message, 'Parameter end is not a valid ISO8601 datetime');

        });

        it('should call correctly the service if both parameters exist and are correct', async () => {
            const weatherController = new WeatherAPIController(weatherService);

            await weatherController.getTemperatures({
                query: {
                    start: '2018-01-01T00:00:00Z',
                    end: '2018-01-02T00:00:00Z'
                }
            });

            assert.equal(weatherService.temperaturesCalls.length, 1);
            assert.deepEqual(weatherService.temperaturesCalls[0], {
                start: new Date('2018-01-01T00:00:00Z'),
                end: new Date('2018-01-02T00:00:00Z')
            });
        });

    });

    describe('getWindspeeds', () => {

        it('should throw an error if a parameter is missing', async () => {

            const endError = await callMethodOnMockAndGetError('getWindspeeds', {
                query: {
                    start: 'xxx'
                }
            });

            const startError = await callMethodOnMockAndGetError('getWindspeeds', {
                query: {
                    end: 'xxx'
                }
            });

            assert.equal(startError.message, 'Parameter start is missing');
            assert.equal(endError.message, 'Parameter end is missing');

        });

        it('should throw an error if a parameter is not formatted correctly', async () => {

            const startError = await callMethodOnMockAndGetError('getWindspeeds', {
                query: {
                    start: '2018-1-1T00:00:00Z',
                    end: '2018-01-01T00:00:00Z'
                }
            });

            const endError = await callMethodOnMockAndGetError('getWindspeeds', {
                query: {
                    start: '2018-01-01T00:00:00Z',
                    end: '2018-1-1T00:00:00Z'
                }
            });

            assert.equal(startError.message, 'Parameter start is not a valid ISO8601 datetime');
            assert.equal(endError.message, 'Parameter end is not a valid ISO8601 datetime');

        });

        it('should call correctly the service if both parameters exist and are correct', async () => {
            const weatherController = new WeatherAPIController(weatherService);

            await weatherController.getWindspeeds({
                query: {
                    start: '2000-01-01T00:00:00Z',
                    end: '2001-01-01T00:00:00Z'
                }
            });

            assert.equal(weatherService.windspeedsCalls.length, 1);
            assert.deepEqual(weatherService.windspeedsCalls[0], {
                start: new Date('2000-01-01T00:00:00Z'),
                end: new Date('2001-01-01T00:00:00Z')
            });
        });

    });

    describe('getWeather', () => {

        it('should throw an error if a parameter is missing', async () => {

            const endError = await callMethodOnMockAndGetError('getWeather', {
                query: {
                    start: 'xxx'
                }
            });

            const startError = await callMethodOnMockAndGetError('getWeather', {
                query: {
                    end: 'xxx'
                }
            });

            assert.equal(startError.message, 'Parameter start is missing');
            assert.equal(endError.message, 'Parameter end is missing');

        });

        it('should throw an error if a parameter is not formatted correctly', async () => {

            const startError = await callMethodOnMockAndGetError('getWeather', {
                query: {
                    start: '2018-1-1T00:00:00Z',
                    end: '2018-01-01T00:00:00Z'
                }
            });

            const endError = await callMethodOnMockAndGetError('getWeather', {
                query: {
                    start: '2018-01-01T00:00:00Z',
                    end: '2018-1-1T00:00:00Z'
                }
            });

            assert.equal(startError.message, 'Parameter start is not a valid ISO8601 datetime');
            assert.equal(endError.message, 'Parameter end is not a valid ISO8601 datetime');

        });

        it('should call correctly the service if both parameters exist and are correct', async () => {
            const weatherController = new WeatherAPIController(weatherService);

            await weatherController.getWeather({
                query: {
                    start: '1995-07-06T00:00:00Z',
                    end: '1998-06-07T00:00:00Z'
                }
            });

            assert.equal(weatherService.weatherCalls.length, 1);
            assert.deepEqual(weatherService.weatherCalls[0], {
                start: new Date('1995-07-06T00:00:00Z'),
                end: new Date('1998-06-07T00:00:00Z')
            });
        });

    });

});

class WeatherServiceMock implements IWeatherService {

    public temperaturesCalls: Array<any>;
    public windspeedsCalls: Array<any>;
    public weatherCalls: Array<any>;

    constructor() {
        this.temperaturesCalls = [];
        this.windspeedsCalls = [];
        this.weatherCalls = [];
    }

    public async fetchTemperatures(start: Date, end: Date) {
        this.temperaturesCalls.push({ start, end });
    }

    public async fetchWindspeeds(start: Date, end: Date) {
        this.windspeedsCalls.push({ start, end });
    }

    public async fetchWeather(start: Date, end: Date) {
        this.weatherCalls.push({ start, end });
    }

}