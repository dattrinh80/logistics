import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { SetCustomerStatusDto } from './dto/set-customer-status.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const existing = await this.customerRepository.findOne({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException(`Customer with code ${dto.code} already exists`);
    }

    const entity = this.customerRepository.create({
      ...dto,
      active: dto.active ?? true,
    });
    return this.customerRepository.save(entity);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Customer> {
    const entity = await this.customerRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return entity;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    const entity = await this.findOne(id);

    if (dto.code && dto.code !== entity.code) {
      const existing = await this.customerRepository.findOne({ where: { code: dto.code } });
      if (existing) {
        throw new ConflictException(`Customer with code ${dto.code} already exists`);
      }
    }

    Object.assign(entity, dto);
    return this.customerRepository.save(entity);
  }

  async setStatus(id: string, dto: SetCustomerStatusDto): Promise<Customer> {
    const entity = await this.findOne(id);
    entity.active = dto.active;
    return this.customerRepository.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.customerRepository.remove(entity);
  }
}
