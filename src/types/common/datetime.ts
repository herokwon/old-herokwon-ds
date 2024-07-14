import { CALENDAR_FORMS } from '../../data/constant';

export type CalendarForm = (typeof CALENDAR_FORMS)[number];
export type Months = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DateItem {
  year: number;
  month: Months;
  date: number;
}

export interface ViewedDate extends Pick<DateItem, 'year'> {
  year: number;
  month: Months | null;
  date: number | null;
}

export interface TimeItem {
  hour: number;
  minute: number;
}
