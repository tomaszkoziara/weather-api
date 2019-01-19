import 'reflect-metadata';
import 'mocha';
import { assert, expect } from 'chai';
import * as fetchMock from 'fetch-mock';

import { WindspeedAPI, IWindspeedAPI } from '../src/service/WindspeedAPI';

describe('WindspeedAPI', () => {

    let windspeedAPI: IWindspeedAPI = null;

    beforeEach(() => {
        global['fetch'] = require('fetch-mock').sandbox();
        fetchMock.restore();

        fetchMock
            .mock('http://localhost:8080?at=2018-07-10T00%3A00%3A00Z', JSON.stringify({
                north: -17.989980201472466,
                west: 16.300917971882726,
                date: "2018-07-10T00:00:00Z"
            }));

        windspeedAPI = new WindspeedAPI();
    });

    describe('fetchWindspeed', () => {

        it('should respond with windspeed data and date if called with correct date', async () => {

            const temperature = await windspeedAPI.fetchWindspeed(new Date('2018-07-10T13:00:00Z'));

            assert.deepEqual(temperature, {
                north: -17.989980201472466,
                west: 16.300917971882726,
                date: '2018-07-10T00:00:00Z'
            });

        });

        it('should throw and error if date parameter is null', async () => {

            let caughtError: Error = null;
            try {
                await windspeedAPI.fetchWindspeed(null);
            } catch (error) {
                caughtError = error;
            }

            assert.deepEqual(caughtError.message, 'Parameter date missing!');

        });

        it('should retrieve data from cache if called with same day', async () => {

            const windspeed1 = await windspeedAPI.fetchWindspeed(new Date('2018-07-10T13:00:00Z'));
            const windspeed2 = await windspeedAPI.fetchWindspeed(new Date('2018-07-10T13:06:45Z'));

            assert.deepEqual(windspeed1, {
                north: -17.989980201472466,
                west: 16.300917971882726,
                date: '2018-07-10T00:00:00Z'
            });
            assert.deepEqual(windspeed2, {
                north: -17.989980201472466,
                west: 16.300917971882726,
                date: '2018-07-10T00:00:00Z'
            });
            const numberCalls = fetchMock.calls('http://localhost:8080?at=2018-07-10T00%3A00%3A00Z').length;
            assert.equal(numberCalls, 1);

        });

    });

});