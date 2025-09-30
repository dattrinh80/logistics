import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../../api/dto/create-customer.dto';
import { SetCustomerStatusDto } from '../../api/dto/set-customer-status.dto';
import { UpdateCustomerDto } from '../../api/dto/update-customer.dto';
import { Customer } from '../../domain/entities/customer';
import { CustomerRepository } from '../../domain/repositories/customer-repository';
import { CUSTOMER_REPOSITORY } from '../../infrastructure/persistence/customer-repository.token';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const existing = await this.customerRepository.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(`Customer with code ${dto.code} already exists`);
    }

    const customer = Customer.create({
      code: dto.code,
      name: dto.name,
      contactEmail: dto.contactEmail,
      active: dto.active,
      webhookUrl: dto.webhookUrl,
    });

    return this.customerRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);

    if (dto.code && dto.code !== customer.code) {
      const existing = await this.customerRepository.findByCode(dto.code);
      if (existing) {
        throw new ConflictException(`Customer with code ${dto.code} already exists`);
      }
    }

    if (dto.code !== undefined) {
      customer.code = dto.code;
    }

    if (dto.name !== undefined) {
      customer.name = dto.name;
    }

    if (dto.contactEmail !== undefined) {
      customer.contactEmail = dto.contactEmail;
    }

    if (dto.active !== undefined) {
      customer.active = dto.active;
    }

    if (dto.webhookUrl !== undefined) {
      customer.webhookUrl = dto.webhookUrl;
    }

    return this.customerRepository.save(customer);
  }

  async setStatus(id: string, dto: SetCustomerStatusDto): Promise<Customer> {
    const customer = await this.findOne(id);
    customer.active = dto.active;
    return this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}
