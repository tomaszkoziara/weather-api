import * as moment from 'moment';

class DateUtils {

    static toISO8601WithZeroTime(date: string): string {
        if (!date) {
            throw new Error('Parameter date missing!');
        }

        const dateAsMoment = moment(date, moment.ISO_8601);
        if (!dateAsMoment.isValid()) {
            throw new Error('Parameter date is not a valid ISO8601 date!');
        }

        const datePart = date.split('T')[0];
        const formattedDate = datePart + 'T00:00:00Z';

        return formattedDate;
    }

}

export { DateUtils };