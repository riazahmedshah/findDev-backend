import {S3Client} from "@aws-sdk/client-s3"

export const s3Client = new S3Client({
  region: process.env.S3_REGION || 'us-east-1',
  endpoint:`${process.env.S3_ENDPOINT}:${process.env.S3_PORT}`,
  credentials: {
    accessKeyId:process.env.S3_ACCESS_KEY || '',
    secretAccessKey:process.env.S3_SECRET_KEY || '',
  },
  forcePathStyle:true
}) 