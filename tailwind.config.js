/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				white: "#FFF",
				black: "#000",
				red: {
					400: "#ffcccc",
					500: "#ff9999",
					600: "#ff6666",
					700: "#ff3333",
					800: "#ff0000",
					900: "#cc0000",
				},
				primary: {
					// 50: '#fdf8f6',
					100: "#008E89",
					200: "#EFF7F7",
					300: "#E9F5F5",
					400: "#CAEBEB",
					500: "#B6E4E3",
					600: "#82D3D0",
					700: "#51C2BE",
					800: "#1DB1AB",
					900: "#008E89",
				},
				secondary: {
					800: "#E7C14B",
					900: "#E7B113",
				},
				neutral: {
					300: "#008E89",
					400: "#DDEDEE",
					500: "#D2E2E5",
					600: "#B6CED4",
					700: "#93B8C1",
					800: "#427D8F",
					900: "#0C566D",
				},
			},
			borderWidth: {
				1: "1.5px",
			},
			fontFamily: {
				primary: ["var(--font-antonio)"],
				secondary: ["var(--font-asap)"],
			},
			boxShadow: {
				sm: "rgba(0, 0, 0, 0.05) 0px 1px 3px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 0px",
				md: "rgba(99, 99, 99, 0.15) 0px 2px 8px 0px;",
				lg: "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
				xl: "0 0px 15px -3px rgb(0 0 0 / 0.1), 0 0px 6px -4px rgb(0 0 0 / 0.1)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			outline: {
				custom: ["2px solid #ff0000", "-webkit-focus-ring-color auto 5px"],
			},
		},
	},
	plugins: [],
};
