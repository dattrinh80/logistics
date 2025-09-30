import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../../../domain/entities/customer';
import { CustomerRepository } from '../../../domain/repositories/customer-repository';
import { CustomerOrmEntity } from './entities/customer.orm-entity';

@Injectable()
export class CustomerTypeOrmRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly repository: Repository<CustomerOrmEntity>,
  ) {}

  async findAll(): Promise<Customer[]> {
    const entities = await this.repository.find({ order: { name: 'ASC' } });
    return entities.map(entity => this.mapToDomain(entity));
  }

  async findById(id: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByCode(code: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({ where: { code } });
    return entity ? this.mapToDomain(entity) : null;
  }

  async save(customer: Customer): Promise<Customer> {
    const entity = this.mapToPersistence(customer);
    const saved = await this.repository.save(entity);
    return this.mapToDomain(saved);
  }

  async remove(customer: Customer): Promise<void> {
    const id = customer.id;
    if (!id) {
      return;
    }
    await this.repository.delete(id);
  }

  private mapToDomain(entity: CustomerOrmEntity): Customer {
    return Customer.restore({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      contactEmail: entity.contactEmail,
      active: entity.active,
      webhookUrl: entity.webhookUrl ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private mapToPersistence(customer: Customer): CustomerOrmEntity {
    const plain = customer.toObject();
    return this.repository.create({
      id: plain.id,
      code: plain.code,
      name: plain.name,
      contactEmail: plain.contactEmail,
      active: plain.active,
      webhookUrl: plain.webhookUrl ?? null,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    });
  }
}
