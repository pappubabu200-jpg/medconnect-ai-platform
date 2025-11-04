import { S3 } from '@aws-sdk/client-s3';
const s3 = new S3({
  endpoint: process.env.S3_ENDPOINT,
  credentials: { accessKeyId: process.env.S3_ACCESS_KEY || '', secretAccessKey: process.env.S3_SECRET_KEY || '' },
  region: process.env.AWS_REGION || 'us-east-1',
  forcePathStyle: true,
});
export default s3;
