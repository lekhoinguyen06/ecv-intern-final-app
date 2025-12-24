import { Module } from '@nestjs/common';
import { SecretManagerService } from './secret.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SecretManagerService],
  exports: [SecretManagerService],
})
export class SecretModule {}
