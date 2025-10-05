import dotenv from "dotenv";
dotenv.config();


export const data_config = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName:process.env.S3_BUCKET_NAME
};
