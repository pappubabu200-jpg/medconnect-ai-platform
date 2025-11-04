import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ConsultsModule } from './consults/consults.module';
import { PaymentsModule } from './payments/payments.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, PostsModule, DoctorsModule, ConsultsModule, PaymentsModule, AiModule],
  providers: [PrismaService],
})
export class AppModule {}
