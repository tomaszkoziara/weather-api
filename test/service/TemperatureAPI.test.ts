import 'reflect-metadata';
import 'mocha';
import { assert, expect } from 'chai';
import * as fetchMock from 'fetch-mock';

import { TemperatureAPI, ITemperatureAPI } from '../../src/service/TemperatureAPI';

describe('TemperatureAPI', () => {

    let temperatureAPI: ITemperatureAPI = null;

    beforeEach(() => {
        global['fetch'] = require('fetch-mock').sandbox();
        fetchMock.restore();

        fetchMock
            .mock('http://localhost:8000?at=2018-08-12T00%3A00%3A00Z', JSON.stringify({
                temp: 10.12345678901234,
                date: '2018-08-12T00:00:00Z'
            }));

        temperatureAPI = new TemperatureAPI();
    });

    describe('fetchTemperature', () => {

        it('should respond with temperature and date if called with correct date', async () => {

            const temperature = await temperatureAPI.fetchTemperature(new Date('2018-08-12T13:00:00Z'));

            assert.deepEqual(temperature, {
                temp: 10.12345678901234,
                date: '2018-08-12T00:00:00Z'
            });

        });

        it('should throw and error if date parameter is null', async () => {

            let caughtError: Error = null;
            try {
                await temperatureAPI.fetchTemperature(null);
            } catch (error) {
                caughtError = error;
            }

            assert.deepEqual(caughtError.message, 'Parameter date missing!');

        });

        it('should retrieve data from cache if called with same day', async () => {

            const temperature1 = await temperatureAPI.fetchTemperature(new Date('2018-08-12T13:00:00Z'));
            const temperature2 = await temperatureAPI.fetchTemperature(new Date('2018-08-12T13:15:30Z'));

            assert.deepEqual(temperature1, {
                temp: 10.12345678901234,
                date: '2018-08-12T00:00:00Z'
            });
            assert.deepEqual(temperature2, {
                temp: 10.12345678901234,
                date: '2018-08-12T00:00:00Z'
            });
            const numberCalls = fetchMock.calls('http://localhost:8000?at=2018-08-12T00%3A00%3A00Z').length;
            assert.equal(numberCalls, 1);

        });

    });

});