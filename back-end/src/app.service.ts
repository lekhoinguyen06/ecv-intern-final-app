import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { LogService } from './log/log.service';

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(private logService: LogService) {}

  onApplicationShutdown() {
    this.logService.silly('🛑 Application is shutting down');
  }
}
