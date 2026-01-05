import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleDestroy {
  onModuleDestroy() {
    console.log('🛑 Application is shutting down');
  }
}
