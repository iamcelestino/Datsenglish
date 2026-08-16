import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

export default defineConfig({
	markdown: {
	    processor: unified({
	      remarkPlugins: [remarkReadingTime],
	    }),
	},
	i18n: {
	    locales: ["pt", "en"],
	    defaultLocale: "pt",
	   	routing: {
	    	prefixDefaultLocale: false,
	  	},
  }
});
