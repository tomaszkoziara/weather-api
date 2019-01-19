import * as buildUrl from 'build-url';
import { injectable } from 'inversify';
import { DateUtils } from '../util/DateUtils';
import * as config from 'config';
import { AbstractAPI } from './AbstractAPI';

interface IWindspeedAPI {
    fetchWindspeed(date: Date);
}

@injectable()
class WindspeedAPI extends AbstractAPI implements IWindspeedAPI {

    private endpoint: string;

    constructor() {
        super();
        this.endpoint = config.get('externalAPI.windspeed');
    }

    /**
     * Fetches a windspeed from windspeed API.
     * 
     * @param date a date as ISO8601 string
     */
    async fetchWindspeed(date: Date): Promise<any> {
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

export { IWindspeedAPI, WindspeedAPI };