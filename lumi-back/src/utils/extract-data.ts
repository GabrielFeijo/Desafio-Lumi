import { PDFExtract } from 'pdf.js-extract';

export const extractDataFromPdf = async (pdfBuffer: Buffer) => {
	const pdfExtract = new PDFExtract();

	try {
		const data = await pdfExtract.extractBuffer(pdfBuffer, {});
		return data;
	} catch (error) {
		console.error('Error extracting text from PDF:', error);
		throw new Error('Failed to extract text from PDF');
	}
};
