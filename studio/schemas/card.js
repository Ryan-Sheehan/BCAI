import React from "react";
import { IconContext } from "react-icons";

import {
	CgCardHearts,
	CgCardClubs,
	CgCardDiamonds,
	CgCardSpades,
} from "react-icons/cg";
import bcaiSwatches from "./bcaiSwatches";
export default {
	name: "card",
	title: "Card",
	type: "object",
	icon: CgCardHearts,
	fields: [
		{
			name: "question",
			type: "string",
			title: "Question",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "note",
			type: "string",
			title: "Note",
		},
		{
			name: "primaryColor",

			title: "Primary Color",

			type: "colorlist",
			options: {
				borderradius: {
					outer: "100%",
					inner: "100%",
				},
				list: bcaiSwatches,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: "secondaryColor",

			title: "Secondary Color",

			type: "colorlist",
			options: {
				borderradius: {
					outer: "100%",
					inner: "100%",
				},
				list: [...bcaiSwatches, { title: "White", value: "#FFFFFF" }],
			},
			validation: (Rule) => Rule.required(),
		},

		{
			name: "mode",
			title: "Mode",
			type: "string",
			options: {
				list: [
					{ title: "Text and Voice", value: "text" },
					{ title: "Photo", value: "image" },
				],
				layout: "radio",
			},
			validation: (Rule) => Rule.required(),
		},
	],
	preview: {
		select: {
			question: "question",
			primaryColor: "primaryColor.value",
			secondaryColor: "secondaryColor.value",
			note: "note",
			mode: "mode.value",
		},
		prepare(selection) {
			const { question, mode, primaryColor, secondaryColor } = selection;
			console.log(selection);

			return {
				title: question,
				subtitle: mode,
				media: (
					<div
						style={{
							backgroundColor: primaryColor,
							height: "100%",
							width: "100%",
						}}
					>
						<div
							style={{
								height: "100%",
								width: "100%",
								position: "absolute",
								bottom: 0,
								right: 0,
								left: 0,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<div
								style={{
									backgroundColor: secondaryColor,
									height: "40%",
									width: "40%",
								}}
							/>
						</div>
					</div>
				),
			};
		},
	},
};
