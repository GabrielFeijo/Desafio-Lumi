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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileFromS3Handler = exports.uploadFileToS3Handler = void 0;
const aws_service_1 = require("./aws.service");
function uploadFileToS3Handler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            const part = yield request.file();
            if (!part) {
                return reply.status(400).send({
                    message: 'No file uploaded',
                });
            }
            if (part.file) {
                const buffers = [];
                try {
                    for (var _d = true, _e = __asyncValues(part.file), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                        _c = _f.value;
                        _d = false;
                        const chunk = _c;
                        buffers.push(chunk);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                const url = yield (0, aws_service_1.uploadFile)(Buffer.concat(buffers), part.filename);
                return reply.status(200).send(url);
            }
        }
        catch (error) {
            console.error(error);
            return reply.status(500).send({
                message: 'Something went wrong',
                error: error,
            });
        }
    });
}
exports.uploadFileToS3Handler = uploadFileToS3Handler;
function deleteFileFromS3Handler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filename } = request.params;
            yield (0, aws_service_1.deleteFile)(filename);
            return reply.status(200).send();
        }
        catch (error) {
            console.error(error);
            return reply.status(500).send({
                message: 'Something went wrong',
                error: error,
            });
        }
    });
}
exports.deleteFileFromS3Handler = deleteFileFromS3Handler;
//# sourceMappingURL=aws.controller.js.map