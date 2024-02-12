/** @type {import('tailwindcss').Config} */

import { THEMES_VALUES } from './src/utils/constants'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			...THEMES_VALUES,
			{
				genericdark: {
					primary: '#D931BF',

					secondary: '#6344D9',

					accent: '#EAE7AF',

					neutral: '#9D8DD9',

					'base-100': '#160F30',

					info: '#31DBDB',

					success: '#30D166',

					warning: '#E5C573',

					error: '#A72626'
				}
			}
		]
	},
	plugins: [require('daisyui')]
}
