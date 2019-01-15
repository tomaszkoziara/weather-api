import * as buildUrl from 'build-url';
import { injectable, inject } from 'inversify';
import { IWindspeedAPIConfig } from './WindspeedAPIConfig';
import { TYPES } from '../../types';
import { DateUtils } from '../../util/DateUtils';

interface IWindspeedAPI {
    fetchWindspeed(date: string);
}

@injectable()
class WindspeedAPI implements IWindspeedAPI {

    private endpoint: string;

    constructor(
        @inject(TYPES.IWindspeedAPIConfig) windspeedAPIConfig: IWindspeedAPIConfig
    ) {
        this.endpoint = windspeedAPIConfig.getEndpoint();
    }

    async fetchWindspeed(date: string): Promise<any> {
        const formattedDate = DateUtils.toISO8601WithZeroTime(date);

        const url = buildUrl(this.endpoint, {
            queryParams: {
                at: formattedDate
            }
        });
        const response = await global['fetch'](url, {});
        return response.json();
    }

}

export { IWindspeedAPI, WindspeedAPI };