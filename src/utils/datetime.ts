import type { DateItem, Months } from "../types";
import { MONTHS } from "../data/constant";

export const getDateHandler = {
    headInMonth: (dayOfTheWeek: number): number =>
        (7 - dayOfTheWeek) % 7 + 1,
    tailInMonth: (dayOfTheWeek: number): number =>
        7 * Math.floor((7 - dayOfTheWeek) / 7) + dayOfTheWeek,
    month: (year: number, month: Months): 28 | 29 | 30 | 31 => {
        switch (true) {
            case (month < 8 && month !== 2):
                return month % 2 === 0 ?
                    30 :
                    31;
            case month >= 8:
                return month % 2 === 0 ?
                    31 :
                    30;
            default:
                return year % 4 === 0 ?
                    29 :
                    28;
        }
    },
};

export const getDayHandler = {
    firstDateInMonth: (year: number, month: Months) =>
        new Date(`${year}-${month.toString().padStart(2, '0')}-01`).getDay(),
    lastDateInMonth: (year: number, month: Months, totalDatesOfMonth: ReturnType<typeof getDateHandler.month>) =>
        new Date(`${year}-${month.toString().padStart(2, '0')}-${totalDatesOfMonth}`).getDay(),
};

export const getDateItem = (date: Date): DateItem => ({
    year: date.getFullYear(),
    month: MONTHS[date.getMonth()],
    date: date.getDate(),
    day: date.getDay(),
});

export const getTheNumberOfWeeksInMonth = (year: number, month: Months): number => {
    const totalDatesOfMonth = getDateHandler.month(year, month);
    const firstDayOfTheWeek = getDayHandler.firstDateInMonth(year, month);
    const lastDayOfTheWeek = getDayHandler.lastDateInMonth(year, month, totalDatesOfMonth);

    return (totalDatesOfMonth - (7 - firstDayOfTheWeek) - (lastDayOfTheWeek + 1)) / 7 + 2;
};

// export const getWeekNumberInMonth = (item: Date | DateItem): DateItem['week'] => {
//     const itemYear = item instanceof Date ?
//         item.getFullYear() :
//         item.year;
//     const itemMonth = item instanceof Date ?
//         MONTHS[item.getMonth()] :
//         item.month;
//     const itemDate = item instanceof Date ?
//         item.getDate() :
//         item.date;
//     const itemDay = item instanceof Date ?
//         item.getDay() :
//         item.day;

//     const totalDatesInThisMonth = getDateHandler.month(itemYear, itemMonth);
//     const headDatesInThisMonth = getDateHandler.headInMonth(getDayHandler.firstDateInMonth(itemYear, itemMonth));
//     const tailDatesInThisMonth = getDateHandler.tailInMonth(getDayHandler.lastDateInMonth(itemYear, itemMonth, totalDatesInThisMonth));

//     switch (true) {
//         case (headDatesInThisMonth < 4) && (itemDate < 4):
//             const yearOfLastMonth = itemMonth === 1 ?
//                 itemYear - 1 :
//                 itemYear;
//             const lastMonth = MONTHS[MONTHS.indexOf(itemMonth) - 1];

//             const totalDatesInLastMonth = getDateHandler.month(yearOfLastMonth, lastMonth);
//             const headDatesInLastMonth = getDateHandler.headInMonth(getDayHandler.firstDateInMonth(yearOfLastMonth, lastMonth));
//             const tailDatesInLastMonth = getDateHandler.tailInMonth(getDayHandler.lastDateInMonth(yearOfLastMonth, lastMonth, totalDatesInLastMonth));

//             return {
//                 baseMonth: MONTHS[MONTHS.indexOf(itemMonth) - 1],
//                 weekNum: (headDatesInLastMonth < 4 ?
//                     Math.floor(totalDatesInLastMonth - tailDatesInLastMonth) :
//                     Math.ceil(totalDatesInLastMonth - tailDatesInLastMonth)) + 1,
//             };
//         case (tailDatesInThisMonth < 4) && (itemDate > totalDatesInThisMonth - 4):
//             return {
//                 baseMonth: MONTHS[MONTHS.indexOf(itemMonth) + 1],
//                 weekNum: 1,
//             };
//         default:
//             return {
//                 baseMonth: itemMonth,
//                 weekNum: Math.ceil((itemDate - getDateHandler.tailInMonth(itemDay)) / 7),
//             };
//     }
// };