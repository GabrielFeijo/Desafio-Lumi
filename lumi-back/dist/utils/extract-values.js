"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSequentialValues = exports.extractSingleValues = void 0;
const extractSingleValues = (content, positions) => {
    const extractedValues = {};
    for (const [field, position] of Object.entries(positions)) {
        const { x, y } = position;
        const item = content.find((item) => Math.abs(item.x - x) < 6 && Math.abs(item.y - y) < 6 && item.width > 0);
        if (item) {
            extractedValues[field] = item.str;
        }
    }
    return extractedValues;
};
exports.extractSingleValues = extractSingleValues;
const extractSequentialValues = (content, positions, spacing) => {
    const results = [];
    let index = 0;
    while (true) {
        let itemFound = false;
        const extractedValues = {};
        for (const [field, position] of Object.entries(positions)) {
            const { x, y } = position;
            const adjustedY = y + index * spacing;
            const item = content.find((item) => Math.abs(item.x - x) < 6 &&
                Math.abs(item.y - adjustedY) < 6 &&
                item.width > 0);
            if (item) {
                extractedValues[field] = item.str;
                itemFound = true;
            }
        }
        if (!itemFound)
            break;
        results.push(extractedValues);
        index++;
    }
    return results;
};
exports.extractSequentialValues = extractSequentialValues;
//# sourceMappingURL=extract-values.js.map