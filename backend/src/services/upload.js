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
    Bucket: data_config.bucketName,
    Key: key,
    ContentType: fileType,
  });
  console.log('bucket',data_config.bucketName);
  console.log('region',data_config.region);
  console.log('s3 client' , s3);
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  console.log(uploadUrl);
  
  const fileUrl = `https://${data_config.bucketName}.s3.${data_config.region}.amazonaws.com/${key}`;

  return { uploadUrl, fileUrl };
}