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
  
  try{
    const key = `patients/${Date.now()}-${filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  await s3.send(command);
  const url = await getSignedUrl(s3, command, { expiresIn: 300 });
  return { url ,  key };

  }catch(er){
    console.error(er);
  }

}