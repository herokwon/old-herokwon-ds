import type { DateItem, ElementStatus, Months } from '../types';

import { MONTHS } from '../data/constants';

export const getDateHandler = {
  headInMonth: (dayOfTheWeek: number): number => ((7 - dayOfTheWeek) % 7) + 1,
  tailInMonth: (dayOfTheWeek: number): number =>
    7 * Math.floor((7 - dayOfTheWeek) / 7) + dayOfTheWeek,
  month: (year: number, month: Months): number =>
    new Date(month === 12 ? year + 1 : year, month, 0).getDate(),
};

export const getDayHandler = {
  firstDateInMonth: (year: number, month: Months): number =>
    new Date(`${year}-${month.toString().padStart(2, '0')}-01`).getDay(),
  lastDateInMonth: (
    year: number,
    month: Months,
    totalDatesOfMonth: ReturnType<typeof getDateHandler.month>,
  ): number =>
    new Date(
      `${year}-${month.toString().padStart(2, '0')}-${totalDatesOfMonth}`,
    ).getDay(),
};

export const getDateItem = (date: Date): DateItem => ({
  year: date.getFullYear(),
  month: MONTHS[date.getMonth()],
  date: date.getDate(),
});

export const getDateItemsOfWeek = ({
  weeklyIndex,
  viewedDate,
  pickedDate,
  holidays = [],
  firstDayInMonth,
  totalDatesInThisMonth,
  totalDatesInLastMonth,
}: {
  weeklyIndex: number;
  viewedDate: Omit<DateItem, 'date'>;
  pickedDate: DateItem;
  holidays?: DateItem[];
  firstDayInMonth: number;
  totalDatesInThisMonth: number;
  totalDatesInLastMonth: number;
}): (Omit<ElementStatus, 'isLoading'> & DateItem & { isHoliday: boolean })[] =>
  Array.from({ length: 7 }, (_, index) => {
    const dailyIndex: number = weeklyIndex * 7 + index - firstDayInMonth;
    const item: DateItem = {
      year:
        dailyIndex < 0
          ? viewedDate.month === 1
            ? viewedDate.year - 1
            : viewedDate.year
          : dailyIndex >= totalDatesInThisMonth
            ? viewedDate.month === 12
              ? viewedDate.year + 1
              : viewedDate.year
            : viewedDate.year,
      month:
        dailyIndex < 0
          ? viewedDate.month
          : dailyIndex >= totalDatesInThisMonth
            ? viewedDate.month === 12
              ? MONTHS[viewedDate.month]
              : viewedDate.month
            : viewedDate.month,
      date:
        dailyIndex < 0
          ? totalDatesInLastMonth + dailyIndex + 1
          : dailyIndex >= totalDatesInThisMonth
            ? dailyIndex + 1 - totalDatesInThisMonth
            : dailyIndex + 1,
    };

    const isDisabled: boolean =
      dailyIndex < 0 || dailyIndex >= totalDatesInThisMonth;
    const isSelected: boolean =
      !isDisabled &&
      item.year === pickedDate.year &&
      item.month === pickedDate.month &&
      item.date === pickedDate.date;
    const isHoliday: boolean =
      holidays.findIndex(
        holiday =>
          holiday.year === item.year &&
          holiday.month === item.month &&
          holiday.date === item.date,
      ) > -1;

    return {
      isDisabled,
      isSelected,
      isHoliday,
      ...item,
    };
  });

export const getTheNumberOfWeeksInMonth = (
  year: number,
  month: Months,
): number => {
  const totalDatesOfMonth = getDateHandler.month(year, month);
  const firstDayOfTheWeek = getDayHandler.firstDateInMonth(year, month);
  const lastDayOfTheWeek = getDayHandler.lastDateInMonth(
    year,
    month,
    totalDatesOfMonth,
  );

  return (
    (totalDatesOfMonth - (7 - firstDayOfTheWeek) - (lastDayOfTheWeek + 1)) / 7 +
    2
  );
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
