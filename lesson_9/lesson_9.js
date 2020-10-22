const newYear = new Date(2020, 12, 31, 24, 0, 0);
const startDate = new Date(2020, 11, 30, 14, 0, 0);

function getTimeToDate(eventDate, startDate = new Date()) {
    const difference = Math.floor(startDate.getTime() - eventDate.getTime());
    const year = 1000 * 60 * 60 * 24 * 365;
    const month = 1000 * 60 * 60 * 24 * 30;
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;

    const years = Math.floor(difference/year);
    const months = Math.floor(difference/month);
    const days = Math.floor(difference/day/24);
    const hours = Math.floor(difference/hour % 24);
    const minutes = Math.floor(difference/minute % 60);
    const seconds = Math.floor(difference % 60);
    
    let message = startDate.toDateString();
    message += ' in ';
    if (years) message += years + ' years ';
    if (months) message += months + ' months ';
    if (days) message += days + ' days ';
    if (hours) message += hours + ' hours ';
    if (minutes) message += minutes + ' minutes ';
    if (seconds) message += seconds + ' seconds ';

    return message;
}

x = getTimeToDate(startDate, newYear);

console.log(x)