/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			textColor: {
				error: "var(--text-error)",
				ok: "var(--text-ok)",
				main: "var(--text-main)",
				iconColor: "var(--btn-icon-main)",
			},
			backgroundColor: {
				base: "var(--base-bg)",
				primary: "var(--btn-bg-primary)",
				primaryHover: "var(--btn-bg-primary-hover)",
				ok: "var(--btn-bg-ok)",
				lightOk: "var(--btn-bg-light-ok)",
				light: "var(--btn-bg-light)",
				lowPriority: "var(--low-priority)",
				mediumPriority: "var(--medium-priority)",
				highPriority: "var(--high-priority)",
			},
			borderColor: {
				container: "var(--border-container)",
				input: "var(--border-input)",
				error: "var(--border-error)",
			},
		},
	},
	plugins: [],
};
