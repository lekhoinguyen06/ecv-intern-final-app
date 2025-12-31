import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogService } from './log/log.service';
import { HTTPExceptionFilter } from './filter/http.filter';
import { DatabaseExceptionFilter } from './filter/database.filter';
import { SuccessResponseTransformInterceptor } from './intercept/response.intercept';
import { MetricService } from './log/metric.service';
import { MetricInterceptor } from './log/metric.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logService = app.get(LogService);
  const metricService = app.get(MetricService);
  app.useGlobalInterceptors(
    new SuccessResponseTransformInterceptor(),
    new MetricInterceptor(MetricService),
  );
  app.useGlobalFilters(
    new DatabaseExceptionFilter(logService),
    new HTTPExceptionFilter(logService),
  );

  logService.silly('🚀 Application starting...');
  await app.listen(process.env.PORT ?? 3000);
  logService.silly(
    `✅ Application is running on port ${process.env.PORT ?? 3000}`,
  );
}
void bootstrap();
