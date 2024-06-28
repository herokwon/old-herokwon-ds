import type { StorybookConfig } from "@storybook/nextjs";

import { resolve } from "path";

const config: StorybookConfig = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    core: {
        disableTelemetry: true
    },
    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-links",
        "@storybook/addon-onboarding",
        "storybook-dark-mode",
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    features: {
        experimentalRSC: true,
    },
    staticDirs: ['../public'],
    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@': resolve(__dirname, '../src'),
                '@public': resolve(__dirname, '../public'),
            };
        }

        if (!config.module || !config.module.rules) return config;

        config.module.rules = [
            ...config.module.rules.map((rule) => {
                if (!rule || rule === "...") return rule;
                if (rule.test && /svg/.test(String(rule.test))) return { ...rule, exclude: /\.svg$/i };
                return rule;
            }),
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            }];

        return config;
    },
    typescript: {
        reactDocgen: "react-docgen-typescript"
    },
};

export default config;