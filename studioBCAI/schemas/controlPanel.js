import React from "react";

export default {
	name: "controlPanel",
	title: "Control Panel",
	type: "object",
	fields: [
		{
			name: "activeDeck",
			type: "reference",
			to: [{ type: "deck" }],
			title: "Active Deck",

			validation: (Rule) => Rule.required(),
		},
		{
			title: "Published",
			name: "published",
			description:
				"When this is on, whatever deck is selected here will be active on the app. If off, BCAI will show users a screen saying there are currently no questions to be answered.",
			type: "boolean",
			initialValue: false,
			validation: (Rule) => Rule.required(),
		},
	],
};
