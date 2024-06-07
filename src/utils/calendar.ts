import type { Months } from "@/types";

export const getFirstDayOfTheWeek = (year: number, month: Months): number =>
    new Date(`${year}-${month.toString().padStart(2, '0')}-01`).getDay();

export const getLastDayOfTheWeek = (year: number, month: Months, totalDatesOfMonth: ReturnType<typeof getDatesOfMonth>): number =>
    new Date(`${year}-${month.toString().padStart(2, '0')}-${totalDatesOfMonth}`).getDay();

export const getDatesOfMonth = (year: number, month: Months): 28 | 29 | 30 | 31 => {
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
};

export const getWeeksOfMonth = (year: number, month: Months): number => {
    const totalDatesOfMonth = getDatesOfMonth(year, month);
    const firstDayOfTheWeek = getFirstDayOfTheWeek(year, month);
    const lastDayOfTheWeek = getLastDayOfTheWeek(year, month, totalDatesOfMonth);

    return (totalDatesOfMonth - (7 - firstDayOfTheWeek) - (lastDayOfTheWeek + 1)) / 7 + 2;
};