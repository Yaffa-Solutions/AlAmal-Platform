import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { data_config } from '../config/config';

const s3 = new S3Client({
region:data_config.region ,
credentials:{
    accessKeyId:data_config.accessKeyId , 
    secretAccessKey:data_config.secretAccessKey
}
});




export async function generatePresignedUrl(filename, contentType) {
  const key = `organizations/${Date.now()}-${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 });
  return { url, key };
}