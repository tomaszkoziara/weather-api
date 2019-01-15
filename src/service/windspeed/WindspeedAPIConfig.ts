import * as config from 'config';
import { injectable } from 'inversify';

interface IWindspeedAPIConfig {
    getEndpoint(): string;
}

@injectable()
class WindspeedAPIConfig {

    getEndpoint(): string {
        return config.get('externalAPI.windspeed');
    }

}

export { IWindspeedAPIConfig, WindspeedAPIConfig };