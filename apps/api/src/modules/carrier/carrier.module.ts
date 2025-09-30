import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierController } from './api/controllers/carrier.controller';
import { CarrierService } from './application/services/carrier.service';
import { carrierRepositoryProvider } from './infrastructure/persistence/carrier-repository.provider';
import { CarrierTypeOrmRepository } from './infrastructure/persistence/typeorm/carrier-typeorm.repository';
import { CarrierOrmEntity } from './infrastructure/persistence/typeorm/entities/carrier.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarrierOrmEntity])],
  providers: [CarrierService, CarrierTypeOrmRepository, carrierRepositoryProvider],
  controllers: [CarrierController],
  exports: [CarrierService],
})
export class CarrierModule {}
