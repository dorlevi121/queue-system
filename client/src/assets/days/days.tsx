import moment from "moment";

export const FullHebDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
export const shortenedHebDays = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
export const FullEngDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const dateformat = "yyyy/MM/DD";
export const eventFormat = "YYYY-MM-DD HH:mm";

// Get week number and return all the days of week
export const getWeekDaysByWeekNumber = (weeknumber?: number) => {
    var date = moment().isoWeek(weeknumber || 1).startOf("week"), weeklength = 6, days = [];
    while (weeklength--) {
        days.push(date.format(dateformat));
        date.add(1, "day")
    }
    return days;
}

export const monthHebToEng = (month: string) => {
    switch (month) {
        case 'ינואר':
            return 'January';
        case 'פבואר':
            return 'February';
        case 'מרץ':
            return 'March';
        case 'אפריל':
            return 'May';
        case 'מאי':
            return 'May';
        case 'יוני':
            return 'June';
        case 'יולי':
            return 'July';
        case 'אוגוסט':
            return 'August';
        case 'ספטמבר':
            return 'September';
        case 'אוקטובר':
            return 'October';
        case 'נובמבר':
            return 'November';
        case 'דצמבר':
            return 'December';
    }
}
export const monthNumberToHeb = (month: number): string => {
    switch (month) {
        case 1:
            return 'ינואר';
        case 2:
            return 'פבואר';
        case 3:
            return 'מרץ';
        case 4:
            return 'אפריל';
        case 5:
            return 'מאי';
        case 6:
            return 'יוני';
        case 7:
            return 'יולי';
        case 8:
            return 'אוגוסט';
        case 9:
            return 'ספטמבר';
        case 10:
            return 'אוקטובר';
        case 11:
            return 'נובמבר';
        default:
            return 'דצמבר'
    }
}


