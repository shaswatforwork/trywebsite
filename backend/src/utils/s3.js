import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

const {
  AWS_REGION, S3_BUCKET, S3_UPLOAD_EXPIRES = "300"
} = process.env;

AWS.config.update({ region: AWS_REGION });

const s3 = new AWS.S3({ signatureVersion: "v4" });

export async function getPresignedUploadUrl(contentType) {
  const Key = `products/${uuid()}`;
  const params = {
    Bucket: S3_BUCKET,
    Key,
    ContentType: contentType,
    Expires: parseInt(S3_UPLOAD_EXPIRES, 10),
    ACL: "public-read"
  };
  const url = await s3.getSignedUrlPromise("putObject", params);
  return { url, key: Key, publicUrl: `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${Key}` };
}
