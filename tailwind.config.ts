import { join } from "path"
import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"
import { skeleton } from "@skeletonlabs/tw-plugin"
import { tzlg_theme } from "./src/tzlg_theme"

export default {
	darkMode: "class",
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte,ts}"),
	],
	theme: {
		extend: {},
	},
	plugins: [
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: "hamlindigo",
						enhancements: true,
					},
				],
				custom: [tzlg_theme],
			},
		}),
	],
} satisfies Config
