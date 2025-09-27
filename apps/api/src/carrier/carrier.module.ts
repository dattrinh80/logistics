import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierController } from './carrier.controller';
import { Carrier } from './carrier.entity';
import { CarrierService } from './carrier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  providers: [CarrierService],
  controllers: [CarrierController],
  exports: [CarrierService],
})
export class CarrierModule {}
