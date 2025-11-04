import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
  const admin = await prisma.user.upsert({ where: { email: 'admin@medconnect.test' }, update: {}, create: { email: 'admin@medconnect.test', name: 'Admin', role: 'ADMIN' } });
  const doc = await prisma.user.upsert({ where: { email: 'doc@medconnect.test' }, update: {}, create: { email: 'doc@medconnect.test', name: 'Dr. Test', role: 'DOCTOR' } });
  await prisma.doctor.upsert({ where: { userId: doc.id }, update: {}, create: { userId: doc.id, licenseNumber: 'LIC1234', specialties: ['general'], verified: true } });
  const patient = await prisma.user.upsert({ where: { email: 'patient@medconnect.test' }, update: {}, create: { email: 'patient@medconnect.test', name: 'Patient Zero', role: 'PATIENT' } });
  console.log('Seed done');
}
main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>process.exit());
