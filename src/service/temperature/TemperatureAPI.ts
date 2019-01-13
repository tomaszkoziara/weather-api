import * as buildUrl from 'build-url';
import * as moment from 'moment';
import { injectable, inject } from 'inversify';
import { ITemperatureAPIConfig } from './TemperatureAPIConfig';
import { TYPES } from '../../types';

interface ITemperatureAPI {
    fetchTemperature(date);
}

@injectable()
class TemperatureAPI implements ITemperatureAPI {

    private endpoint: string;

    constructor(
        @inject(TYPES.ITemperatureAPIConfig) temperatureAPIConfig: ITemperatureAPIConfig
    ) {
        this.endpoint = temperatureAPIConfig.getEndpoint();
    }

    async fetchTemperature(date): Promise<any> {
        const url = buildUrl(this.endpoint, {
            queryParams: {
                at: date
            }
        });
        const response = await global['fetch'](url, {});
        return response.json();
    }

}

export { ITemperatureAPI, TemperatureAPI };