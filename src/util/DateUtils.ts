import * as moment from 'moment';
import { extendMoment } from 'moment-range';

const extendedMoment = extendMoment(moment);

class DateUtils {

    /**
     * Converts a date in a ISO8601 string with 0 hours, minutes and seconds.
     * 
     * @param date a date to convert
     */
    static toISO8601WithZeroTime(date: Date): string {

        if (!date) {
            throw new Error('Parameter date missing!');
        }

        const isoDate = date.toISOString();
        const datePart = isoDate.split('T')[0];
        const formattedDate = datePart + 'T00:00:00Z';

        return formattedDate;
    }

    /**
     * Returns the arrays of dates between two dates.
     * Starting and ending dates are included.
     * 
     * @param start starting date
     * @param end ending date
     */
    static getRangeBetweenDates(start: Date, end: Date) {
        const startMoment = moment(start);
        const endMoment = moment(end);

        if (startMoment.isAfter(endMoment)) {
            return [];
        }

        const range = extendedMoment.range(startMoment, endMoment);
        const daysInBetween = range.by('day');

        return Array.from(daysInBetween).map((m) => { return m.toDate() });
    }

}

export { DateUtils };