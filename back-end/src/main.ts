import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogService } from './log/log.service';
import { HTTPExceptionFilter } from './filter/http.filter';
import { DatabaseExceptionFilter } from './filter/database.filter';
import { SuccessResponseTransformInterceptor } from './intercept/response.intercept';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logService = app.get(LogService);
  app.useGlobalInterceptors(new SuccessResponseTransformInterceptor());
  app.useGlobalFilters(
    new DatabaseExceptionFilter(logService),
    new HTTPExceptionFilter(logService),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  logService.silly('🚀 Application starting...');
  await app.listen(process.env.PORT ?? 3000);
  logService.silly(
    `✅ Application is running on port ${process.env.PORT ?? 3000}`,
  );
}
void bootstrap();
