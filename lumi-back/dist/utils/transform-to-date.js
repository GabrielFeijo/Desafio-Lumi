"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToDate = void 0;
const transformToDate = (dateString) => {
    const [day, month, year] = dateString
        .split('/')
        .map((part) => parseInt(part, 10));
    return new Date(year, month - 1, day);
};
exports.transformToDate = transformToDate;
//# sourceMappingURL=transform-to-date.js.map