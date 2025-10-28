import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { data_config } from '../config/config.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
region:data_config.region ,
credentials:{
    accessKeyId:data_config.accessKeyId , 
    secretAccessKey:data_config.secretAccessKey
}
});




export async function generatePresignedUrl(filename, fileType) {
  
  const key = `patients/${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const fileUrl = `https://${data_config.bucketName}.s3.${data_config.region}.amazonaws.com/${key}`;

  return { uploadUrl, fileUrl };
}