/** @type {import('next').NextConfig} */

const nextConfig = {
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				resourceQuery: { not: /url/ }, // exclude if *.svg?url
				loader: "@svgr/webpack",
				options: {},
			}
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "acpvrarbefctkcejmfeo.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/uploads/**",
			},
			{
				protocol: "https",
				hostname: "avataaars.io",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
