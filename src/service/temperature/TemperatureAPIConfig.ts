import * as config from 'config';
import { injectable } from 'inversify';
import { TYPES } from '../../types';

interface ITemperatureAPIConfig {
    getEndpoint(): string;
}

@injectable()
class TemperatureAPIConfig {

    getEndpoint(): string {
        return config.get('externalAPI.temperature');
    }

}

export { ITemperatureAPIConfig, TemperatureAPIConfig };