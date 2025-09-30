import { Carrier } from '../entities/carrier';

export interface CarrierRepository {
  findAll(): Promise<Carrier[]>;
  findById(id: string): Promise<Carrier | null>;
  findByCode(code: string): Promise<Carrier | null>;
  save(carrier: Carrier): Promise<Carrier>;
  remove(carrier: Carrier): Promise<void>;
}
