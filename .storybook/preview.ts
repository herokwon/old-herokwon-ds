import type { Preview } from "@storybook/react";
import { create } from "@storybook/theming";

import "../src/styles/globals.css";

const lightTheme = create({
    base: 'light',
    appBg: '#ffffff',
    colorPrimary: '#3b82f6',
    colorSecondary: '#e2e8f0',
});

const darkTheme = create({
    base: 'dark',
    appBg: '#121212',
    colorPrimary: '#2563eb',
    colorSecondary: '#1e293b',
});

const preview: Preview = {
    parameters: {
        layout: 'centered',
        controls: {
            sort: 'requiredFirst',
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        darkMode: {
            light: lightTheme,
            dark: darkTheme,
            stylePreview: true,
        },
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
};

export default preview;