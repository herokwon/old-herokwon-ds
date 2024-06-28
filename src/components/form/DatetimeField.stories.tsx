import type { Meta, StoryObj } from "@storybook/react";
import { FaCalendarDays } from "react-icons/fa6";

import DatetimeField from "./DatetimeField";

const meta = {
    title: 'Components/DatetimeField',
    tags: ['autodocs'],
    component: DatetimeField,
    args: {
        type: 'date',
    },
} satisfies Meta<typeof DatetimeField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        label: 'Required',
        id: 'required-input',
        required: true,
    },
};

export const FieldIcon: Story = {
    args: {
        readOnly: true,
        fieldIcon: FaCalendarDays,
    },
};

export const HelperMessage: Story = {
    args: {
        helperMessage: 'This is a helper message',
    },
};

export const ErrorMessage: Story = {
    args: {
        errorMessage: 'Error!',
    },
};