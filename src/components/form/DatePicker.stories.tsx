import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import type { DateItem } from "@/types";
import { getDateItem } from "@/utils";
import DatePicker from "./DatePicker";

const meta = {
    title: 'Components/DatePicker',
    tags: ['autodocs'],
    component: DatePicker,
} satisfies Meta<typeof DatePicker>;
export default meta;

type Story = StoryObj<typeof DatePicker>;

const DatePickerRender = () => {
    const today = getDateItem(new Date());
    const [pickedDate, setPickedDate] = useState<DateItem>(today);

    return (
        <DatePicker
            today={today}
            pickedDate={pickedDate}
            setPickedDate={setPickedDate} />
    );
};

export const Default: Story = {
    render: () =>
        <DatePickerRender />
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
    render: () =>
        <DatePickerRender />
};