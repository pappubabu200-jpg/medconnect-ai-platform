import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');
const worker = new Worker('ai-jobs', async job => {
  console.log('Processing AI job', job.id, job.name, job.data);
  // TODO: call AI microservice or OpenAI directly
}, { connection });

worker.on('failed', (job, err) => {
  console.error('Job failed', job?.id, err);
});
