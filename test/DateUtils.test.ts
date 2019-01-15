import 'reflect-metadata';
import 'mocha';
import { assert } from 'chai';
import { DateUtils } from '../src/util/DateUtils';
import * as moment from 'moment';

describe('DateUtils', () => {

    let temperatureAPI = null;

    describe('toISO8601WithZeroTime', () => {

        it('should return an error if called with null value', async () => {

            let caughtError: Error = null;
            try {
                DateUtils.toISO8601WithZeroTime(null);
            } catch (error) {
                caughtError = error;
            }

            assert.equal(caughtError.message, 'Parameter date missing!');

        });

        it('should return an ISO8601 formatted string with 0s as time', async () => {

            const formattedDate = DateUtils.toISO8601WithZeroTime('2011-10-10T14:48:00');

            assert.isTrue(moment(formattedDate, moment.ISO_8601).isValid());
            assert.equal(formattedDate, '2011-10-10T00:00:00Z');

        });

        it('should ignore date shift from given timezone to zulu time', async () => {

            const formattedDate = DateUtils.toISO8601WithZeroTime('2011-10-10T23:59:59-02:00');

            assert.isTrue(moment(formattedDate, moment.ISO_8601).isValid());
            assert.equal(formattedDate, '2011-10-10T00:00:00Z');

        });

        it('should throw an error if date isn\'t in ISO8601 format', async () => {

            let caughtError: Error = null;
            try {
                DateUtils.toISO8601WithZeroTime('2011-10-10T23:59:59GMT+2');
            } catch (error) {
                caughtError = error;
            }

            assert.equal(caughtError.message, 'Parameter date is not a valid ISO8601 date!');

        });

    });

});