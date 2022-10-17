import { fileURLToPath, URL } from 'url';
import postcssPresetEnv from 'postcss-preset-env';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv({
                    browsers: ['last 4 versions', '> 5%', 'ie > 9'],
                }),
            ],
        },
    },
});
