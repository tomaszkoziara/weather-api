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

            const formattedDate = DateUtils.toISO8601WithZeroTime(new Date('2011-10-10T14:48:00'));

            assert.isTrue(moment(formattedDate, moment.ISO_8601).isValid());
            assert.equal(formattedDate, '2011-10-10T00:00:00Z');

        });

        it('should take global day in zulu time with zero time', async () => {

            const formattedDate = DateUtils.toISO8601WithZeroTime(new Date('2011-10-10T23:59:59-02:00'));

            assert.isTrue(moment(formattedDate, moment.ISO_8601).isValid());
            assert.equal(formattedDate, '2011-10-11T00:00:00Z');

        });

    });

    describe('getRangeBetweenDates', () => {
        it('should give all dates in interval including extremes', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2011-10-10T00:00:00Z'), new Date('2011-10-15T00:00:00Z'));

            assert.equal(days.length, 6);
            assert.equal(days[0].toISOString(), '2011-10-10T00:00:00.000Z');
            assert.equal(days[1].toISOString(), '2011-10-11T00:00:00.000Z');
            assert.equal(days[2].toISOString(), '2011-10-12T00:00:00.000Z');
            assert.equal(days[3].toISOString(), '2011-10-13T00:00:00.000Z');
            assert.equal(days[4].toISOString(), '2011-10-14T00:00:00.000Z');
            assert.equal(days[5].toISOString(), '2011-10-15T00:00:00.000Z');

        });

        it('should handle leap years', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2020-02-28T00:00:00Z'), new Date('2020-03-01T00:00:00Z'));

            assert.equal(days.length, 3);
            assert.equal(days[0].toISOString(), '2020-02-28T00:00:00.000Z');
            assert.equal(days[1].toISOString(), '2020-02-29T00:00:00.000Z');
            assert.equal(days[2].toISOString(), '2020-03-01T00:00:00.000Z');

        });

        it('should handle non leap years', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2019-02-28T00:00:00Z'), new Date('2019-03-01T00:00:00Z'));

            assert.equal(days.length, 2);
            assert.equal(days[0].toISOString(), '2019-02-28T00:00:00.000Z');
            assert.equal(days[1].toISOString(), '2019-03-01T00:00:00.000Z');

        });

        it('should return empty array if dates are inverted', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2019-03-01T00:00:00Z'), new Date('2019-02-28T00:00:00Z'));
            assert.deepEqual(days, []);

        });

        it('should return empty array if dates are inverted of hours', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2019-03-10T014:00:00Z'), new Date('2019-03-10T13:00:00Z'));
            assert.deepEqual(days, []);

        });

        it('should return input date if dates are equal', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2019-01-01T10:00:00Z'), new Date('2019-01-01T10:00:00Z'));

            assert.equal(days.length, 1);
            assert.equal(days[0].toISOString(), '2019-01-01T10:00:00.000Z');

        });

        it('should return the correct number of days even if different timezones are compared', async () => {

            const days = DateUtils.getRangeBetweenDates(new Date('2019-07-15T00:00:00Z'), new Date('2019-07-17T23:59:59-06:00'));

            assert.equal(days.length, 4);
            assert.equal(days[0].toISOString(), '2019-07-15T00:00:00.000Z');
            assert.equal(days[1].toISOString(), '2019-07-16T00:00:00.000Z');
            assert.equal(days[2].toISOString(), '2019-07-17T00:00:00.000Z');
            assert.equal(days[3].toISOString(), '2019-07-18T00:00:00.000Z');

        });

    });

});