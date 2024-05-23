"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataFromPdf = void 0;
const pdf_js_extract_1 = require("pdf.js-extract");
const extractDataFromPdf = (pdfBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    const pdfExtract = new pdf_js_extract_1.PDFExtract();
    try {
        const data = yield pdfExtract.extractBuffer(pdfBuffer, {});
        return data;
    }
    catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF');
    }
});
exports.extractDataFromPdf = extractDataFromPdf;
//# sourceMappingURL=extract-data.js.map