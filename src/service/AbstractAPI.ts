import { injectable } from "inversify";

/**
 * Class that abstracts general API service behaviour.
 */

@injectable()
abstract class AbstractAPI {

    private cache: { [key: string]: object };

    constructor() {
        this.cache = {};
    }

    async getCall(url: string) {
        if (this.cache[url]) {
            return this.cache[url];
        }

        const response = await global['fetch'](url, {});
        const jsonResponse = await response.json();
        // Should check if response contains a server error so is
        // not worth caching and should instead throw an error so it can be handled
        // at service implementation/controller level
        this.cache[url] = jsonResponse;
        return jsonResponse;
    }

}

export { AbstractAPI };