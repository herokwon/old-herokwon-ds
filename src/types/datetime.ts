import { CALENDAR_FORMS } from "@/data/constant";

export type CalendarForm = typeof CALENDAR_FORMS[number];
export type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DateItem {
    year: number;
    month: Months;
    week: {
        baseMonth: number;
        weekNum: number;
    };
    date: number;
    day: number;
};

export interface ViewedDate extends Partial<DateItem> {
    year: number;
};

export interface TimeItem {
    hour: number;
    minute: number;
};