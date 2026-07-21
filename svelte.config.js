import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { APP_REDIRECTS } from './src/redirects.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      // use below parameters if using adapter-cloudflare
			// fallback: 'plaintext',
			// routes: {
			// 	include: ['/*'],
			// 	exclude: ['<all>']
			// }

      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
			strict: true,
    }),
    prerender: {
      entries: [
        '*',
        ...Object.keys(APP_REDIRECTS)
      ]
    }
	},
	extensions: ['.svelte', '.svx']
};

export default config;
