export const getFaviconBuffer = () => {
	return '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';
};