import { GiStack } from "react-icons/gi";

export default {
	name: "deck",
	title: "Decks",
	type: "document",
	icon: GiStack,
	fields: [
		{
			name: "cardGroups",
			type: "array",
			of: [{ type: "cardGroup" }],
			title: "Deck Subgroups",
			editModal: "fullscreen",

			description:
				"Each deck needs four subgroups each consisting of three different question cards. Each subgroup needs to have a topic like Care, Community, etc.",
			validation: (Rule) => Rule.required().min(4).max(4),
		},
	],
	preview: {
		select: {
			cardGroups: "cardGroups",
		},
		prepare(selection) {
			const { cardGroups } = selection;

			const topics = cardGroups.map((cg) => cg.topic).join(", ");
			const topicsString = `On ${topics}`;
			console.log(topics);
			return {
				title: topicsString,
			};
		},
	},
};
