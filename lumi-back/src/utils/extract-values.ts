interface Position {
	x: number;
	y: number;
}

interface ContentItem {
	x: number;
	y: number;
	str: string;
	width: number;
	height: number;
	fontName: string;
}

interface Positions {
	[key: string]: Position;
}

const extractSingleValues = (
	content: ContentItem[],
	positions: Positions
): { [key: string]: string } => {
	const extractedValues: { [key: string]: string } = {};

	for (const [field, position] of Object.entries(positions)) {
		const { x, y } = position;
		const item = content.find(
			(item) =>
				Math.abs(item.x - x) < 6 && Math.abs(item.y - y) < 6 && item.width > 0
		);

		if (item) {
			extractedValues[field] = item.str;
		}
	}

	return extractedValues;
};

const extractSequentialValues = (
	content: ContentItem[],
	positions: Positions,
	spacing: number
): { [key: string]: string }[] => {
	const results: {
		[key: string]: string;
	}[] = [];
	let index = 0;

	while (true) {
		let itemFound = false;
		const extractedValues: { [key: string]: string } = {};

		for (const [field, position] of Object.entries(positions)) {
			const { x, y } = position;
			const adjustedY = y + index * spacing;
			const item = content.find(
				(item) =>
					Math.abs(item.x - x) < 6 &&
					Math.abs(item.y - adjustedY) < 6 &&
					item.width > 0
			);

			if (item) {
				extractedValues[field] = item.str;
				itemFound = true;
			}
		}

		if (!itemFound) break;

		results.push(extractedValues);
		index++;
	}

	return results;
};

export { extractSingleValues, extractSequentialValues };
