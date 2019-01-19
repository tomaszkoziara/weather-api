import * as moment from 'moment';
import { extendMoment } from 'moment-range';

const extendedMoment = extendMoment(moment);

class DateUtils {

    /**
     * Checks if a string is an ISO8601 date and returns the same date 
     * as a string with 0 hours, minutes and seconds.
     * 
     * @param date a string representing a ISO8601 date
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

    // static toISO8601WithZeroTime(date: string): string {
    //     if (!date) {
    //         throw new Error('Parameter date missing!');
    //     }

    //     const dateAsMoment = moment(date, moment.ISO_8601);
    //     if (!dateAsMoment.isValid()) {
    //         throw new Error('Parameter date is not a valid ISO8601 date!');
    //     }

    //     const datePart = date.split('T')[0];
    //     const formattedDate = datePart + 'T00:00:00Z';

    //     return formattedDate;
    // }

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