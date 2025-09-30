import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './api/controllers/customer.controller';
import { CustomerService } from './application/services/customer.service';
import { customerRepositoryProvider } from './infrastructure/persistence/customer-repository.provider';
import { CustomerTypeOrmRepository } from './infrastructure/persistence/typeorm/customer-typeorm.repository';
import { CustomerOrmEntity } from './infrastructure/persistence/typeorm/entities/customer.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity])],
  providers: [CustomerService, CustomerTypeOrmRepository, customerRepositoryProvider],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule {}
