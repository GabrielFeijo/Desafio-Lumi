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
const aws_controller_1 = require("./aws.controller");
const aws_schema_1 = require("./aws.schema");
function awsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/upload', {
            schema: {
                tags: ['AWS'],
                summary: 'Upload file to S3',
                consumes: ['multipart/form-data'],
                response: {
                    201: (0, aws_schema_1.$ref)('uploadResponseSchema'),
                },
            },
        }, aws_controller_1.uploadFileToS3Handler);
        app.delete('/delete/:filename', {
            schema: {
                tags: ['AWS'],
                summary: 'Delete file from S3',
            },
        }, aws_controller_1.deleteFileFromS3Handler);
    });
}
exports.default = awsRoutes;
//# sourceMappingURL=aws.route.js.map