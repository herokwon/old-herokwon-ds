import { useMemo, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import type { CalendarForm, DateItem, Months, ViewedDate } from '../../types';

import {
  getDateHandler,
  getDayHandler,
  getTheNumberOfWeeksInMonth,
} from '../../utils';

import { MONTHS } from '../../data/constant';

import IconButton from './IconButton';
import TextButton from './TextButton';

interface CalendarProps extends React.ComponentPropsWithoutRef<'div'> {
  form: CalendarForm;
  today: DateItem;
  holidays?: DateItem[];
  pickedDate: DateItem;
  setPickedDate: React.Dispatch<
    React.SetStateAction<CalendarProps['pickedDate']>
  >;
}

interface MonthlyCalendarProps
  extends Pick<CalendarProps, 'pickedDate' | 'setPickedDate'> {
  month: Months;
  viewedDate: ViewedDate;
  holidays: DateItem[];
}

interface YearlyCalendarProps extends Omit<MonthlyCalendarProps, 'month'> {
  setViewedDate: React.Dispatch<React.SetStateAction<ViewedDate>>;
}

const dayOfTheWeek: readonly string[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export default function Calendar({
  form,
  today,
  holidays = [],
  pickedDate,
  setPickedDate,
  ...props
}: CalendarProps) {
  const [viewedDate, setViewedDate] = useState<ViewedDate>({
    year: today.year,
    month: form === 'yearly' ? null : today.month,
    date: null,
  });

  const clickHandler = {
    prevButton: () => {
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
      );
    },
    nextButton: () => {
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
      );
    },
  };

  return (
    <div {...props} className={`w-full ${props.className ?? ''}`}>
      <div
        className={`w-full ${
          !viewedDate.month ? 'mb-4' : 'mb-1'
        } flex justify-between rounded-ms`}
      >
        <IconButton
          icon={LuChevronLeft}
          variant="secondary"
          size={!viewedDate.month ? 'lg' : 'md'}
          shape="square"
          className="hover:bg-light-secondary dark:hover:bg-dark-tertiary"
          onClick={clickHandler.prevButton}
        />
        <div className="flex w-full items-center justify-center">
          <TextButton
            label={`${viewedDate.year}`}
            variant="secondary"
            size={!viewedDate.month ? 'lg' : 'md'}
            className={
              !viewedDate.month
                ? 'pointer-events-none font-bold'
                : 'font-semibold'
            }
            onClick={() =>
              setViewedDate(prev => ({
                year: prev.year,
                month: null,
                date: null,
                day: null,
              }))
            }
          />
          {!!viewedDate.month && (
            <>
              <span className="mx-1">/</span>
              <TextButton
                label={`${viewedDate.month}`}
                variant="secondary"
                className="pointer-events-none font-semibold"
              />
            </>
          )}
        </div>
        <IconButton
          icon={LuChevronRight}
          variant="secondary"
          size={!viewedDate.month ? 'lg' : 'md'}
          shape="square"
          className="hover:bg-light-secondary dark:hover:bg-dark-tertiary"
          onClick={clickHandler.nextButton}
        />
      </div>
      {!viewedDate.month ? (
        <YearlyCalendar
          holidays={holidays}
          viewedDate={viewedDate}
          pickedDate={pickedDate}
          setViewedDate={setViewedDate}
          setPickedDate={setPickedDate}
        />
      ) : (
        <MonthlyCalendar
          holidays={holidays}
          month={viewedDate.month}
          viewedDate={viewedDate}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
        />
      )}
    </div>
  );
}

const MonthlyCalendar = ({
  holidays,
  month,
  viewedDate,
  pickedDate,
  setPickedDate,
}: MonthlyCalendarProps) => {
  const theNumberOfWeeksInMonth = useMemo(
    () =>
      getTheNumberOfWeeksInMonth(viewedDate.year, viewedDate.month ?? month),
    [viewedDate, month],
  );
  const firstDayOfTheWeek = useMemo(
    () =>
      getDayHandler.firstDateInMonth(
        viewedDate.year,
        viewedDate.month ?? month,
      ),
    [viewedDate, month],
  );
  const datesInThisMonth = useMemo(
    () => getDateHandler.month(viewedDate.year, viewedDate.month ?? month),
    [viewedDate, month],
  );
  const datesInLastMonth = useMemo(
    () =>
      getDateHandler.month(
        viewedDate.month === 1 ? viewedDate.year - 1 : viewedDate.year,
        MONTHS[MONTHS.indexOf(viewedDate.month ?? month) - 1],
      ),
    [viewedDate, month],
  );

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="grid w-full grid-cols-7 justify-items-center gap-1 py-1">
        {dayOfTheWeek.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className={`text-xs font-semibold tracking-tighter opacity-bold ${
              index === 0
                ? 'text-light-red dark:text-dark-red'
                : index === 6
                  ? 'text-light-blue dark:text-dark-blue'
                  : ''
            }`}
          >
            {value.toUpperCase()}
          </span>
        ))}
      </div>
      {Array.from({ length: theNumberOfWeeksInMonth }, (_, index) => index).map(
        weeklyIndex => (
          <div
            key={weeklyIndex}
            className="grid w-full grid-cols-7 justify-items-center gap-1"
          >
            {Array.from({ length: 7 }, (_, index) => {
              const dailyIndex = weeklyIndex * 7 + index - firstDayOfTheWeek;

              switch (true) {
                case dailyIndex < 0:
                  return datesInLastMonth + (dailyIndex + 1);
                case dailyIndex >= datesInThisMonth:
                  return dailyIndex + 1 - datesInThisMonth;
                default:
                  return dailyIndex + 1;
              }
            }).map((date, index) => {
              const dailyIndex = weeklyIndex * 7 + index - firstDayOfTheWeek;
              const isDisabled =
                dailyIndex < 0 || dailyIndex >= datesInThisMonth;
              const isSelected =
                0 <= dailyIndex &&
                dailyIndex < datesInThisMonth &&
                viewedDate.year === pickedDate.year &&
                (viewedDate.month ?? month) === pickedDate.month &&
                date === pickedDate.date;
              const isHoliday =
                dailyIndex < 0
                  ? !!holidays.find(
                      holiday =>
                        holiday.year ===
                          (viewedDate.month === 1
                            ? viewedDate.year - 1
                            : viewedDate.year) &&
                        holiday.month ===
                          MONTHS[
                            MONTHS.indexOf(viewedDate.month ?? month) - 1
                          ] &&
                        holiday.date === date,
                    )
                  : dailyIndex >= datesInThisMonth
                    ? !!holidays.find(
                        holiday =>
                          holiday.year ===
                            (viewedDate.month === 12
                              ? viewedDate.year + 1
                              : viewedDate.year) &&
                          holiday.month ===
                            MONTHS[
                              MONTHS.indexOf(viewedDate.month ?? month) + 1
                            ] &&
                          holiday.date === date,
                      )
                    : !!holidays.find(
                        holiday =>
                          holiday.year === viewedDate.year &&
                          holiday.month === (viewedDate.month ?? month) &&
                          holiday.date === date,
                      );

              return (
                <TextButton
                  key={dailyIndex}
                  data-selected={isSelected}
                  isDisabled={isDisabled}
                  label={!viewedDate.month && isDisabled ? '' : `${date}`}
                  variant={isSelected ? 'primary' : 'secondary'}
                  size="sm"
                  spacing="compact"
                  className={`aspect-square py-1.5 ${
                    isDisabled
                      ? 'pointer-events-none hover:!bg-transparent'
                      : ''
                  } ${
                    isSelected
                      ? 'pointer-events-none hover:!bg-dark-blue dark:hover:!bg-light-blue'
                      : index === 0 || isHoliday
                        ? '!text-light-red hover:!text-light-red dark:!text-dark-red dark:hover:!text-dark-red'
                        : index === 6
                          ? '!text-light-blue hover:!text-light-blue dark:!text-dark-blue dark:hover:!text-dark-blue'
                          : ''
                  } not-hover:transition-none`}
                  onClick={e => {
                    e.stopPropagation();
                    setPickedDate(prev => ({
                      year: viewedDate.year,
                      month: viewedDate.month ?? month,
                      date: date,
                    }));
                  }}
                />
              );
            })}
          </div>
        ),
      )}
    </div>
  );
};

const YearlyCalendar = ({
  holidays,
  viewedDate,
  pickedDate,
  setViewedDate,
  setPickedDate,
}: YearlyCalendarProps) => {
  return (
    <div className="flex w-fit flex-wrap justify-around gap-4">
      {MONTHS.map(month => (
        <div key={month} className="p-2">
          <TextButton
            label={`${month}`}
            variant="secondary"
            className="mb-1 w-full font-semibold dark:bg-dark-secondary dark:hover:!bg-dark-tertiary"
            onClick={e => {
              e.stopPropagation();
              setViewedDate(prev => ({
                ...prev,
                month: month,
              }));
            }}
          />
          <MonthlyCalendar
            holidays={holidays}
            month={month}
            viewedDate={viewedDate}
            pickedDate={pickedDate}
            setPickedDate={setPickedDate}
          />
        </div>
      ))}
    </div>
  );
};
