import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { FileModule } from './modules/file/file.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { TemporalWorkerModule } from './modules/temporal/temporal.worker';
import { TemporalModule as TemporalNestModule } from 'nestjs-temporal';
import { Connection } from '@temporalio/client';
import { TemporalModule } from './modules/temporal/temporal.module';
import { GoogleDriveModule } from './modules/google-drive/google-drive.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3001),
        API_PREFIX: Joi.string().default('api'),
        CORS_URI_LIST: Joi.string().default('*'),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().port().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_SSL: Joi.boolean().truthy('true').falsy('false').required(),
        TEMPORAL_QUEUE: Joi.string().required(),
        TEMPORAL_HOST: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('POSTGRES_HOST'),
          port: config.get('POSTGRES_PORT'),
          username: config.get('POSTGRES_USER'),
          password: config.get('POSTGRES_PASSWORD'),
          database: config.get('POSTGRES_DB'),
          ssl: config.get('POSTGRES_SSL'),
          synchronize: false,
          logging: false,
          entities: [path.join(__dirname + '/**/*.entity{.ts,.js}')],
          migrations: [path.join(__dirname, '/database/migrations/*{.ts,.js}')],
          migrationsRun: true,
          migrationsTransactionMode: 'each',
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    TemporalNestModule.registerClientAsync({
      useFactory: async (config: ConfigService) => {
        const connection = await Connection.connect({
          address: config.get('TEMPORAL_HOST'),
        });
        return {
          namespace: config.get('TEMPORAL_NAMESPACE') || 'default',
          connection,
        };
      },
      inject: [ConfigService],
    }),
    TemporalModule,
    TemporalWorkerModule,
    FileModule,
    GoogleDriveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
