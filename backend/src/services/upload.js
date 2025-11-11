import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { data_config } from '../config/config.js';

const s3 = new S3Client({
  region: data_config.region,
  credentials: {
    accessKeyId: data_config.accessKeyId,
    secretAccessKey: data_config.secretAccessKey,
  },
});

export async function generatePresignedUrl(filename, fileType) {
  try {
    const key = `patients/${filename}`;
    const command = new PutObjectCommand({
      Bucket: data_config.bucketName,
      Key: key,
      ContentType: fileType,
    });

    await s3.send(command);
    const url = await getSignedUrl(s3, command, { expiresIn: 300 });
    return { url, key };
  } catch (er) {
    console.error(er);
  }
}


export async function deleteReportFile(key) {
  try{
   
    const command=new DeleteObjectCommand({
      Bucket :data_config.bucketName , 
      Key:key 
    });
    await s3.send(command);
 
    console.log('done is deleted');
  }catch(er){
    console.error(er);
  }  
}