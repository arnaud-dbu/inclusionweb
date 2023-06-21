import { FaviconImage } from "@/public/images";
import Image from "next/image";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
	width: 32,
	height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 24,
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
				}}>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 90 90">
					<g transform="translate(4084 4144)">
						<circle cx="45" cy="45" r="45" transform="translate(-4084 -4144)" fill="#79d1cd" />
						<ellipse
							cx="29.5"
							cy="30"
							rx="29.5"
							ry="30"
							transform="translate(-4069 -4129)"
							fill="#a6dfdd"
							opacity="0.92"
						/>
						<ellipse
							cx="14.5"
							cy="15"
							rx="14.5"
							ry="15"
							transform="translate(-4054 -4114)"
							fill="#c4e9e8"
						/>
					</g>
				</svg>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported icons size metadata
			// config to also set the ImageResponse's width and height.
			...size,
		}
	);
}
