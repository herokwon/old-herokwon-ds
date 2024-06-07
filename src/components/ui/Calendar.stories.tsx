import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import type { DateItem } from "@/types";
import { MONTHS } from "@/data/constant";
import Calendar from "./Calendar";

const meta = {
    title: 'Components/Calendar',
    tags: ['autodocs'],
    component: Calendar,
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof Calendar>;

const CalendarRender = ({ ...props }: Pick<React.ComponentProps<typeof Calendar>, 'form'>) => {
    const today = new Date();
    const todayDateItem: DateItem = {
        year: today.getFullYear(),
        month: MONTHS[today.getMonth()],
        week: 0,
        date: today.getDate(),
        day: today.getDay(),
    };
    const [pickedDate, setPickedDate] = useState<DateItem>(todayDateItem);

    return (
        <Calendar
            {...props}
            today={todayDateItem}
            pickedDate={pickedDate}
            setPickedDate={setPickedDate} />
    );
};

export const Monthly: Story = {
    render: () =>
        <CalendarRender form='monthly' />
};

export const Yearly: Story = {
    render: () =>
        <CalendarRender form='yearly' />
};