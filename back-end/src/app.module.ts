import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User as UserEntity } from './user/entity/user.entity';
import { LogModule } from './log/log.module';
import { SecretModule } from './secret/secret.module';
import { SecretManagerService } from './secret/secret.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { CognitoAuthGuard } from './auth/cognito.guard';

async function setupDBCredentials(secretManager: SecretManagerService) {
  interface DBSecret {
    username: string;
    host: string;
    port: string;
    password: string;
  }
  const dbSecret: DBSecret = await secretManager.load(
    process.env.SECRET_NAME ?? 'ecv-intern',
  );
  return {
    type: 'postgres',
    host:
      dbSecret?.host ||
      process.env.DB_HOST ||
      'ecv-intern-rds.cpw4gissg1ma.ap-southeast-1.rds.amazonaws.com',
    port: parseInt(dbSecret?.port) || process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: dbSecret.password,
    database: process.env.DB_DATABASE ?? 'postgres',
    entities: [UserEntity],
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
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api', '/health'],
    }),
    UserModule,
    LogModule,
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
  providers: [  {
      provide: APP_GUARD,
      useClass: CognitoAuthGuard, // Global guard
    },AppService],
})
export class AppModule {}
