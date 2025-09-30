import { Customer } from '../entities/customer';

export interface CustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  findByCode(code: string): Promise<Customer | null>;
  save(customer: Customer): Promise<Customer>;
  remove(customer: Customer): Promise<void>;
}
