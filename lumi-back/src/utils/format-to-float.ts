export const formatStringToFloat = (inputString: string) => {
	const formattedString = inputString.replace(/\./g, '').replace(',', '.');
	const floatValue = parseFloat(formattedString);

	return floatValue;
};
