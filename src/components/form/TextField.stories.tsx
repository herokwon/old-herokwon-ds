import type { Meta, StoryObj } from "@storybook/react";
import { PiTextTBold } from "react-icons/pi";
import { FaRegEnvelope } from "react-icons/fa6";
import { LuLock } from "react-icons/lu";

import { TEXT_INPUT } from "@/data/constant";
import TextField from "./TextField";

const meta = {
    title: 'Components/TextField',
    tags: ['autodocs'],
    component: TextField,
    args: {
        isDisabled: false,
        type: 'text',
        fieldIcon: PiTextTBold,
    },
    argTypes: {
        type: {
            control: 'select',
            options: [...TEXT_INPUT],
        },
    },
} satisfies Meta<typeof TextField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Text input'
    },
};

export const Required: Story = {
    args: {
        label: 'Required',
        id: 'required-input',
        required: true,
        placeholder: 'Required input'
    },
};

export const MaxLength: Story = {
    args: {
        id: 'limited-input',
        maxLength: 10,
        placeholder: 'Max Length : 10',
    },
};

export const Email: Story = {
    args: {
        type: 'email',
        label: 'Email',
        id: 'email-input',
        placeholder: 'Email',
        fieldIcon: FaRegEnvelope,
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        label: 'Password',
        id: 'password-input',
        placeholder: 'Password',
        fieldIcon: LuLock,
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