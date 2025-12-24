import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { LoggerModule } from './logger/logger.module';
import { SecretModule } from './secret/secret.module';
import { SecretManagerService } from './secret/secret.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

async function setupDBCredentials(secretManager: SecretManagerService) {
  interface DBSecret {
    username: string;
    password: string;
  }
  const dbSecret: DBSecret = await secretManager.load(
    process.env.SECRET_NAME ?? 'rds!db-a92b39b1-e81e-4780-999b-87d7c95ad8c8',
  );
  return {
    type: 'postgres',
    host:
      process.env.DB_HOST ??
      'ecv-intern-rds.cpw4gissg1ma.ap-southeast-1.rds.amazonaws.com',
    port: process.env.DB_PORT ?? 5432,
    username: dbSecret?.username || process.env.DB_USERNAME || 'postgres',
    password: dbSecret.password,
    database: process.env.DB_DATABASE ?? 'postgres',
    entities: [User],
    synchronize: true, // Sync with database (turn off for productions - otherwise you can lose production data)
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  } as TypeOrmModuleOptions;
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'out'),
      exclude: ['/api/*'],
    }),
    UserModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SecretModule],
      inject: [SecretManagerService],
      useFactory: async (secretManager: SecretManagerService) => {
        return await setupDBCredentials(secretManager);
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
