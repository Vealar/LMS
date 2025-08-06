import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {v4 as uuidv4} from "uuid";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    },
    forcePathStyle: true,
});

const BUCKET = process.env.S3_BUCKET;

export async function uploadFileToS3(file, prefix = "uploads") {
    const fileStream = fs.createReadStream(file.path);
    const fileExt = path.extname(file.originalname);
    const uniqueName = `${prefix}/${uuidv4()}${fileExt}`;

    const params = {
        Bucket: BUCKET,
        Key: uniqueName,
        Body: fileStream,
        ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    return {
        filename: file.originalname,
        url: `${process.env.S3_ENDPOINT}/${BUCKET}/${uniqueName}`,
    };
}

export async function deleteFileFromS3(fileUrl) {
    const key = extractKeyFromUrl(fileUrl);

    if (!key) throw new Error("Не удалось извлечь ключ из URL");

    const params = {
        Bucket: BUCKET,
        Key: key,
    };

    await s3.send(new DeleteObjectCommand(params));
}

function extractKeyFromUrl(url) {
    const prefix = `${process.env.S3_ENDPOINT}/${BUCKET}/`;
    return url.startsWith(prefix) ? url.replace(prefix, "") : null;
}
