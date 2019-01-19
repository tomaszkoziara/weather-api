import * as buildUrl from 'build-url';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { DateUtils } from '../util/DateUtils';
import * as config from 'config';
import { AbstractAPI } from './AbstractAPI';

interface ITemperatureAPI {
    fetchTemperature(date: Date);
}

@injectable()
class TemperatureAPI extends AbstractAPI implements ITemperatureAPI {

    private endpoint: string;

    constructor() {
        super();
        this.endpoint = config.get('externalAPI.temperature');
    }

    /**
     * Fetches a temperature from temperature API.
     * 
     * @param date
     */
    async fetchTemperature(date: Date): Promise<any> {
        if (!date) {
            throw new Error('Parameter date missing!');
        }

        const formattedDate = DateUtils.toISO8601WithZeroTime(date);

        const url = buildUrl(this.endpoint, {
            queryParams: {
                at: formattedDate
            }
        });
        return this.getCall(url);
    }

}

export { ITemperatureAPI, TemperatureAPI };