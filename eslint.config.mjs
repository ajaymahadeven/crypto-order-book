import tsPlugin from '@typescript-eslint/eslint-plugin';
import nextConfig from 'eslint-config-next';

export default [
    ...nextConfig,
    {
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        settings: {
            react: { version: '19' },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];
