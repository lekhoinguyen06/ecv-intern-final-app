import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ecv-intern-rds.cpw4gissg1ma.ap-southeast-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: ':]ap6uTy|A.>x3psqSX*!#l1<WT|',
      database: 'postgres',
      entities: [User],
      synchronize: true, // Sync with database (turn off for productions - otherwise you can lose production data)
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
