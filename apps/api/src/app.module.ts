import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservabilityModule } from './observability/observability.module';
import { RequestContextMiddleware } from './observability/request-context.middleware';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import validationSchema from './config/validation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarrierModule } from './carrier/carrier.module';
import { CustomerModule } from './customer/customer.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ['.env', '.env.local'],
      validationSchema,
      expandVariables: true,
    }),
    ObservabilityModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const useSsl = configService.get<boolean>('database.ssl');

        return {
          type: 'mysql' as const,
          host: configService.getOrThrow<string>('database.host'),
          port: configService.getOrThrow<number>('database.port'),
          username: configService.getOrThrow<string>('database.username'),
          password: configService.getOrThrow<string>('database.password'),
          database: configService.getOrThrow<string>('database.name'),
          synchronize: false,
          autoLoadEntities: true,
          logging: configService.get<boolean>('database.logging') ?? false,
          charset: 'utf8mb4_unicode_ci',
          ssl: useSsl ? { rejectUnauthorized: false } : undefined,
        };
      },
    }),
    TerminusModule,
    CarrierModule,
    CustomerModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
