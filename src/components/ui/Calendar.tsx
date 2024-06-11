import { useMemo, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import type { ViewedDate, CalendarForm, DateItem, Months } from "@/types";
import { MONTHS } from "@/data/constant";
import { getDateHandler, getDayHandler, getTheNumberOfWeeksInMonth } from "@/utils";
import IconButton from "./IconButton";
import TextButton from "./TextButton";

interface CalendarProps extends React.ComponentPropsWithoutRef<'div'> {
    form: CalendarForm;
    today: DateItem;
    pickedDate: DateItem;
    setPickedDate: React.Dispatch<React.SetStateAction<CalendarProps['pickedDate']>>;
};

interface MonthlyCalendarProps extends Pick<CalendarProps, 'pickedDate' | 'setPickedDate'> {
    month: Months;
    viewedDate: ViewedDate;
};

interface YearlyCalendarProps extends Omit<MonthlyCalendarProps, 'month'> {
    setViewedDate: React.Dispatch<React.SetStateAction<ViewedDate>>;
}

export default function Calendar({ form, today, pickedDate, setPickedDate, ...props }: CalendarProps) {
    const [viewedDate, setViewedDate] = useState<ViewedDate>({
        year: today.year,
        month: form === 'yearly' ?
            undefined :
            today.month,
        week: (form === 'weekly' || form === 'daily') ?
            today.week :
            undefined,
        date: form === 'daily' ?
            today.date :
            undefined,
        day: form === 'daily' ?
            today.day :
            undefined,
    });

    const clickHandler = {
        prevButton: () => {
            setViewedDate((prev) => (!prev.month ? {
                ...prev,
                year: prev.year - 1,
            } : {
                ...prev,
                year: prev.month === 1 ?
                    prev.year - 1 :
                    prev.year,
                month: MONTHS[MONTHS.indexOf(prev.month) - 1],
            }));
        },
        nextButton: () => {
            setViewedDate((prev) => (!prev.month ? {
                ...prev,
                year: prev.year + 1,
            } : {
                ...prev,
                year: prev.month === 12 ?
                    prev.year + 1 :
                    prev.year,
                month: MONTHS[MONTHS.indexOf(prev.month) + 1],
            }));
        },
    };

    return (
        <div {...props} className={`w-full ${props.className ?? ''}`}>
            <div className="w-full mb-1 grid grid-cols-[minmax(0,_1fr)_5fr_minmax(0,_1fr)]">
                <IconButton
                    icon={LuChevronLeft}
                    variant='secondary'
                    spacing='compact'
                    shape='square'
                    className=""
                    onClick={clickHandler.prevButton} />
                <div className="w-full flex justify-center items-center">
                    <TextButton
                        label={`${viewedDate.year}`}
                        variant='secondary'
                        size={!viewedDate.month ?
                            'lg' :
                            'md'}
                        className={!viewedDate.month ?
                            'font-bold pointer-events-none' :
                            'font-semibold'}
                        onClick={() => setViewedDate((prev) => ({
                            year: prev.year,
                            month: undefined,
                        }))} />
                    {!(!viewedDate.month) &&
                        <>
                            <span className="mx-1">/</span>
                            <TextButton
                                label={`${viewedDate.month}`}
                                variant='secondary'
                                className='font-semibold pointer-events-none' />
                        </>}
                </div>
                <IconButton
                    icon={LuChevronRight}
                    variant='secondary'
                    spacing='compact'
                    shape='square'
                    onClick={clickHandler.nextButton} />
            </div>
            <div className="w-full">
                {!viewedDate.month ?
                    <YearlyCalendar
                        viewedDate={viewedDate}
                        pickedDate={pickedDate}
                        setViewedDate={setViewedDate}
                        setPickedDate={setPickedDate} /> :
                    <MonthlyCalendar
                        month={viewedDate.month}
                        viewedDate={viewedDate}
                        pickedDate={pickedDate}
                        setPickedDate={setPickedDate} />}
            </div>
        </div>
    );
}

const MonthlyCalendar = ({ month, viewedDate, pickedDate, setPickedDate }: MonthlyCalendarProps) => {
    const theNumberOfWeeksInMonth = useMemo(() =>
        getTheNumberOfWeeksInMonth(viewedDate.year, viewedDate.month ?? month), [viewedDate, month]);
    const firstDayOfTheWeek = useMemo(() =>
        getDayHandler.firstDateInMonth(viewedDate.year, viewedDate.month ?? month), [viewedDate, month]);
    const datesInThisMonth = useMemo(() =>
        getDateHandler.month(viewedDate.year, viewedDate.month ?? month), [viewedDate, month]);
    const datesInLastMonth = useMemo(() =>
        getDateHandler.month((viewedDate.month === 1) ?
            viewedDate.year - 1 :
            viewedDate.year, MONTHS[MONTHS.indexOf(viewedDate.month ?? month) - 1]), [viewedDate, month]);

    return (
        <div className="w-full">
            {Array.from({ length: theNumberOfWeeksInMonth }, (_, index) => index).map((weeklyIndex) =>
                <div key={weeklyIndex} className="w-full grid grid-cols-7 justify-items-center">
                    {Array.from({ length: 7 }, (_, index) => {
                        const dailyIndex = (weeklyIndex * 7 + index) - firstDayOfTheWeek;

                        switch (true) {
                            case dailyIndex < 0:
                                return datesInLastMonth + (dailyIndex + 1);
                            case dailyIndex >= datesInThisMonth:
                                return (dailyIndex + 1) - datesInThisMonth;
                            default:
                                return dailyIndex + 1;
                        }
                    }).map((date, index) => {
                        const dailyIndex = (weeklyIndex * 7 + index) - firstDayOfTheWeek;
                        const isDisabled = dailyIndex < 0 || dailyIndex >= datesInThisMonth;
                        const isSelected = 0 <= dailyIndex &&
                            dailyIndex < datesInThisMonth &&
                            viewedDate.year === pickedDate.year &&
                            (viewedDate.month ?? month) === pickedDate.month &&
                            date === pickedDate.date;

                        return (
                            <TextButton
                                key={dailyIndex}
                                isDisabled={isDisabled}
                                isSelected={isSelected}
                                label={`${date}`}
                                variant={isSelected ?
                                    'primary' :
                                    'secondary'}
                                size='sm'
                                className={`${isDisabled ?
                                    'hover:!bg-transparent' :
                                    ''} ${index === 0 ?
                                        'text-red' :
                                        index === 6 ?
                                            'text-blue' :
                                            ''} justify-center transition-none`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPickedDate((prev) => ({
                                        ...prev,
                                        month: viewedDate.month ?? month,
                                        date: date,
                                    }));
                                }}
                                style={{
                                    width: '100%',
                                }} />
                        );
                    })}
                </div>)}
        </div>
    );
};

const YearlyCalendar = ({ viewedDate, pickedDate, setViewedDate, setPickedDate }: YearlyCalendarProps) => {
    return (
        <div className="w-full flex flex-wrap gap-4">
            {MONTHS.map((month) =>
                <div
                    key={month}
                    className="p-2 mx-auto rounded-ms border border-transparent hover:border-tertiary shadow-md shadow-transparent hover:shadow-tertiary cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setViewedDate((prev) => ({
                            ...prev,
                            month: month,
                        }));
                    }}>
                    <p className="mb-1 text-center font-semibold">
                        {month}
                    </p>
                    <MonthlyCalendar
                        month={month}
                        viewedDate={viewedDate}
                        pickedDate={pickedDate}
                        setPickedDate={setPickedDate} />
                </div>)}
        </div>
    );
};