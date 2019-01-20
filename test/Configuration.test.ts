import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { appContainer } from "../src/inversify.config";
import { App } from '../src/App';
import { TYPES } from '../src/types';


describe('Configuration', () => {

    it('should set up without errors', async () => {

        let caughtError = null;
        try {
            appContainer.get<App>(TYPES.App);
        } catch (error) {
            caughtError = error;
        }

        const errorMessage = caughtError ? caughtError.message : '';
        assert.isNull(caughtError, `There\'s something wrong with the configuration.\n${errorMessage}`);

    });

});