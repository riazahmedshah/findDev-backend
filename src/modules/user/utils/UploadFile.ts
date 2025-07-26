import { s3Client } from "@/config/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3"

export const uploadFile = async(key: string, body:Buffer, contentType?:string) => {
  const cammand = new PutObjectCommand({
    Bucket:process.env.S3_BUCKET_NAME || 'finddev-uploads',
    Key:key,
    Body:body,
    ContentType:contentType
  });

  await s3Client.send(cammand)
}