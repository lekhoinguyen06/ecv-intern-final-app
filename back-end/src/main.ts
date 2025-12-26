import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogService } from './log/log.service';
import { HTTPExceptionFilter } from './filter/http.filter';
import { DatabaseExceptionFilter } from './filter/database.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logService = app.get(LogService);
  app.useGlobalFilters(
    new DatabaseExceptionFilter(),
    new HTTPExceptionFilter(logService),
  );

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
