export const extractFilename = (url: string) => {
	const urlSplitted = url.split('/');
	const fileName = urlSplitted[urlSplitted.length - 1];
	return fileName;
};
