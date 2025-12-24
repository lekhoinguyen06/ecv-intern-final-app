import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatchEverythingFilter } from './filter/catchEverything.filter';
import { LoggingService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const loggingService = app.get(LoggingService);
  app.useGlobalFilters(new CatchEverythingFilter(loggingService));
}
void bootstrap();
