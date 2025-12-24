import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatchEverythingFilter } from './filter/catchEverything.filter';
import { LogService } from './log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const logService = app.get(LogService);
  app.useGlobalFilters(new CatchEverythingFilter(logService));
}
void bootstrap();
