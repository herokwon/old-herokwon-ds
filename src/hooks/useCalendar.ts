import { useEffect, useMemo, useState } from 'react';

import type { CalendarVariant, DateItem, ViewedDate } from '../types';

import {
  getDateHandler,
  getDayHandler,
  getTheNumberOfWeeksInMonth,
} from '../utils';

import { MONTHS } from '../data/constants';

interface CalendarHookProps {
  variant: CalendarVariant;
  defaultViewedDate?: ViewedDate;
  defaultPickedDate?: DateItem;
  onChangeViewedDate?: (viewedDate: ViewedDate) => void;
  onChangePickedDate?: (pickedDate: DateItem) => void;
}

const useCalendar = ({
  variant,
  defaultViewedDate,
  defaultPickedDate,
  onChangeViewedDate,
  onChangePickedDate,
}: CalendarHookProps) => {
  const today = useMemo(() => new Date(), []);
  const [viewedDate, setViewedDate] = useState<ViewedDate>({
    year: defaultViewedDate?.year ?? today.getFullYear(),
    month:
      variant === 'yearly'
        ? null
        : (defaultViewedDate?.month ?? MONTHS[today.getMonth()]),
  });
  const [pickedDate, setPickedDate] = useState<DateItem>(
    defaultPickedDate ?? {
      year: today.getFullYear(),
      month: MONTHS[today.getMonth()],
      date: today.getDate(),
    },
  );
  const theNumberOfWeeksInMonth = useMemo(
    () =>
      !viewedDate.month
        ? 0
        : getTheNumberOfWeeksInMonth(viewedDate.year, viewedDate.month),
    [viewedDate],
  );
  const firstDayInMonth = useMemo(
    () =>
      !viewedDate.month
        ? 0
        : getDayHandler.firstDateInMonth(viewedDate.year, viewedDate.month),
    [viewedDate],
  );
  const totalDatesInThisMonth = useMemo(
    () =>
      !viewedDate.month
        ? 0
        : getDateHandler.month(viewedDate.year, viewedDate.month),
    [viewedDate],
  );
  const totalDatesInLastMonth = useMemo(
    () =>
      !viewedDate.month
        ? 0
        : getDateHandler.month(viewedDate.year, viewedDate.month),
    [viewedDate],
  );

  const clickHandler = {
    prevButton: () =>
      setViewedDate(prev =>
        !prev.month
          ? {
              ...prev,
              year: prev.year - 1,
            }
          : {
              ...prev,
              year: prev.month === 1 ? prev.year - 1 : prev.year,
              month: MONTHS[MONTHS.indexOf(prev.month) - 1],
            },
      ),
    nextButton: () =>
      setViewedDate(prev =>
        !prev.month
          ? {
              ...prev,
              year: prev.year + 1,
            }
          : {
              ...prev,
              year: prev.month === 12 ? prev.year + 1 : prev.year,
              month: MONTHS[MONTHS.indexOf(prev.month) + 1],
            },
      ),
  };

  useEffect(() => {
    if (
      !defaultPickedDate ||
      (pickedDate.year === defaultPickedDate?.year &&
        pickedDate.month === defaultPickedDate.month &&
        pickedDate.date === defaultPickedDate.date)
    )
      return;

    setPickedDate(defaultPickedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPickedDate]);

  useEffect(() => {
    onChangeViewedDate?.(viewedDate);
  }, [viewedDate, onChangeViewedDate]);

  useEffect(() => {
    onChangePickedDate?.(pickedDate);
  }, [pickedDate, onChangePickedDate]);

  return {
    today,
    viewedDate,
    pickedDate,
    clickHandler,
    theNumberOfWeeksInMonth,
    firstDayInMonth,
    totalDatesInThisMonth,
    totalDatesInLastMonth,
    setViewedDate,
    setPickedDate,
  };
};

export default useCalendar;
