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
exports.deleteFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});
function uploadFile(dataBuffer, filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const putObjectCommand = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: filename,
            Body: dataBuffer,
            ACL: 'public-read',
        });
        try {
            yield s3.send(putObjectCommand);
            const objectUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
            return objectUrl;
        }
        catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file to S3');
        }
    });
}
exports.uploadFile = uploadFile;
function deleteFile(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteObjectCommand = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: filename,
        });
        try {
            yield s3.send(deleteObjectCommand);
        }
        catch (error) {
            console.error('Error deleting file from S3:', error);
            throw new Error('Failed to delete file from S3');
        }
    });
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=aws.service.js.map