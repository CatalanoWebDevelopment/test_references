// @Credit https://www.i-programmer.info/programming/javascript/6322-date-hacks-doing-javascript-date-calculations.html

// Standard Date Object: var d = new Date(year, month, day);

const date = new Date(Date.now());
console.log("(Date) new Date(Date.now()): ", date) // 2021-03-02T18:05:48.792Z
console.log("Date using .toDateString(): ", date.toDateString()) // Tue Mar 02 2021

const now = Date.now();
console.log("(Now) Date.now(): ", now) // 1614708181844

// You can compute the difference between two dates and times using subtraction
const interval = now - date;
console.log("(Interval) now - date: ", interval) // 8

// Notice that the result of the subtraction, i.e. interval in this case, isn't a date but the number of milliseconds between the two dates. That is the difference between two date objects or a date object and a numeric value isn't a date object but a numeric value.

/*===========================================*/
//   The Number Of Days Between Two Dates    //
/*==========================================*/

var days = interval/24/60/60/1000;
console.log("(Days 1) interval/24/60/1000: ", days) // 8.101851851851852e-8

const toDays = d => {
    d = d || 0;
    return d / 24 / 60 / 60 / 1000;
};

// However if you are interested in extracting the whole number of days from the fractional part you have to take care. As the difference is simply one hour i.e. about .042 of a day you can round the result.
var days = Math.round(interval/24/60/60/1000);
console.log("(Days 2) Math.round(interval/24/60/1000): ", days) // 0

// So to compute the exact number of days between two dates we need to convert them to UTC. Unfortunately there is no standard JavaScript function which will do this but we can make one very easily:

const toUTC = d => {
    if (!d || !d.getFullYear) return 0;
    return Date.UTC(d.getFullYear(), d.getMonth(),d.getDate());
};

// Notice that this doesn't return a date object but a numeric value corresponding to the number of milliseconds since midnight Jan 1, 1970. 
// Now that you can work out the UTC date you can get the number of days between two dates as follows

const daysBetween = (day1, day2) => {
    return toDays(toUTC(day2) - toUTC(day1));
};

let day1 = new Date(2021, 01, 20);
let day2 = new Date(2021, 02, 01);

console.log(`(daysBetween) The number of days between ${day1.toDateString()} and ${day2.toDateString()} is ${daysBetween(day1, day2)}.`);


/*===========================================*/
//      The Number Of Days in the Month      //
/*==========================================*/

var month = 1;
var year = 2021;
var day = 1;
var dateObject = new Date(year, month, 1);
var monthToString = dateObject.toLocaleString('default', { month: 'long' });

// If you don't specify a year parameter then the current year is used as a default. 
const daysInMonth = (month, year) => {
    var year = year || new Date(Date.now()).getFullyear();
    return toDays(Date.UTC(year, month + 1, 1) - Date.UTC(year, month, 1));
};

console.log(`(daysInMonth) There are ${daysInMonth(month, year)} days in ${monthToString}.`);


/*===========================================*/
//      The Number Of Days in the Year       //
/*==========================================*/

// Sort leap years automatically
const daysInYear = year => {
    var year = year || new Date(Date.now()).getFullYear();
    return (toDays(Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)));
};

console.log(`(daysInYear) There are ${daysInYear(year)} days in the year ${year}.`);

/*===========================================*/
//      The Number Of Days in a Quarter      //
/*==========================================*/

// For example the number of days in a quarter i.e. three calender months, is just:
const daysInQuarter = (q, y) => {
    var y = y || new Date(Date.now()).getFullYear();
    return toDays(Date.UTC(y, (q + 1) * 3, 1) - Date.UTC(y, (q * 3), 1));
}; 

/*===========================================*/
//      First Named Day of the Month         //
/*==========================================*/

const firstNamedDayInMonth = (day, month, year) => {
    // day is in range 0 Sunday to 6 Saturday
    var year = year || new Date(Date.now()).getFullYear();
    var month = month || new Date(Date.now()).getMonth();

    return new Date(year, month, 1 + (day - new Date(year, month, 1).getDay() + 7) % 7);
};

console.log(`(firstNamedDayInMonth) The first day in the month of ${monthToString} is: ${firstNamedDayInMonth(day, month, year)}.`);


/*===========================================*/
//      Nth Named Day of the Month           //
/*==========================================*/

const nthNamedDayInMonth = (n, day, month, year) => {
    // day is in range 0 Sunday to 6 Saturday
    var year = year || new Date(Date.now()).getFullYear();
    var month = month || new Date(Date.now()).getMonth();
    let d = firstNamedDayInMonth(day, month, year);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (n - 1) * 7);
};

console.log("(nthNamedDayInMonth) You can set n to 1 for the first day, to 2 for the second and so on. So the 3rd Thursday in the current month is just nthNamedDayInMonth(3,4): ", nthNamedDayInMonth(3,4));


/*===========================================*/
//      Interval From a Given Date           //
/*==========================================*/

const daysFromFixedDay = d => {
    let y = new Date(Date.now()).getFullYear();
    let m = new Date(Date.now()).getMonth();
    let d2 = new Date(Date.now()).getDate();
    let dInPrevMonth = daysInMonth(m - 1, y);

    return (toDays( Date.UTC(y, m, d2) - Date.UTC(y, m, d)) + dInPrevMonth) % dInPrevMonth;
};

// This will get how many days until the desired day, from the current date
console.log(`(daysFromFixedDay) There have been ${daysFromFixedDay(1)} days since ${date.toDateString()}.`);