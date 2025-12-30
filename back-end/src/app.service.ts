import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { LogService } from './log/log.service';

@Injectable()
export class AppService implements OnModuleDestroy {
  constructor(private logService: LogService) {}

  onModuleDestroy() {
    this.logService.silly('🛑 Application is shutting down');
  }
}
