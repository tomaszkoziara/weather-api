import 'reflect-metadata';
import 'mocha';
import * as fetchMock from 'fetch-mock';

import { TemperatureAPI } from '../TemperatureAPI';

describe('TemperatureAPI', () => {
    beforeEach(() => {
        global['fetch'] = require('fetch-mock').sandbox();
    });

    describe('fetchTemperature', () => {

        it('should return data temperature and data give if called with correct date', async () => {

            global['fetch'] = require('fetch-mock').sandbox();

            fetchMock
                .mock('http://localhost:8000?at=2018-08-12T13%3A00%3A00Z', JSON.stringify({
                    temp: 10.12345678901234,
                    date: '2018-08-12T00:00:00Z'
                }));

            const temperatureAPI = new TemperatureAPI({
                getEndpoint: () => {
                    return 'http://localhost:8000';
                }
            });

            const temperature = await temperatureAPI.fetchTemperature('2018-08-12T13:00:00Z');
            console.log(temperature);

        });

    });
});


// test('basic', async () => {
//     const temperatureAPI = new TemperatureAPI({
//         getEndpoint: () => {
//             return 'http://localhost:8000';
//         }
//     });

//     const temperature = await temperatureAPI.fetchTemperature('2018-08-12T13:00:00Z');
//     console.log(await temperature.json());
// });