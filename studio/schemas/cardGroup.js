import React from "react";

export default {
	name: "cardGroup",
	title: "Card Group",
	type: "object",
	fields: [
		{
			name: "topic",
			type: "string",
			title: "Topic",
			description: "The topic these three question cards will be on.",
			validation: (Rule) => Rule.required(),
		},
		{
			name: "cards",
			type: "array",
			of: [{ type: "card" }],
			title: "Cards",
			description:
				"The top card in the list will show to the user first. You can drag to reorder the apperance of the question cards.",

			validation: (Rule) => Rule.required().min(3).max(3),
		},
	],
	preview: {
		select: {
			topic: "topic",
			cards: "cards",
		},
		prepare(selection) {
			const { topic, cards } = selection;

			const primaryColors = cards.map((c) =>
				c?.primaryColor ? c?.primaryColor.value : "black"
			);
			console.log("-----");
			console.log(primaryColors);
			console.log("-----");
			return {
				title: topic,
				media: (
					<div
						style={{
							height: "100%",
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{primaryColors.map((pc, i) => {
							return (
								<div
									key={i}
									style={{
										borderRadius: "1px",
										backgroundColor: pc,
										marginRight: "3px",

										height: "40%",
										width: "20%",
									}}
								/>
							);
						})}
					</div>
				),
			};
		},
	},
};
