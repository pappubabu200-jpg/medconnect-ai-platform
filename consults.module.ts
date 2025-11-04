import { Module } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { ConsultsController } from './consults.controller';

@Module({ providers: [ConsultsService], controllers: [ConsultsController] })
export class ConsultsModule {}
