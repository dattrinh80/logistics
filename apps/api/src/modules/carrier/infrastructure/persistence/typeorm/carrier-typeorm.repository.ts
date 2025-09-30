import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrier } from '../../../domain/entities/carrier';
import { CarrierRepository } from '../../../domain/repositories/carrier-repository';
import { CarrierOrmEntity } from './entities/carrier.orm-entity';

@Injectable()
export class CarrierTypeOrmRepository implements CarrierRepository {
  constructor(
    @InjectRepository(CarrierOrmEntity)
    private readonly repository: Repository<CarrierOrmEntity>,
  ) {}

  async findAll(): Promise<Carrier[]> {
    const entities = await this.repository.find({ order: { name: 'ASC' } });
    return entities.map(entity => this.mapToDomain(entity));
  }

  async findById(id: string): Promise<Carrier | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByCode(code: string): Promise<Carrier | null> {
    const entity = await this.repository.findOne({ where: { code } });
    return entity ? this.mapToDomain(entity) : null;
  }

  async save(carrier: Carrier): Promise<Carrier> {
    const entity = this.mapToPersistence(carrier);
    const saved = await this.repository.save(entity);
    return this.mapToDomain(saved);
  }

  async remove(carrier: Carrier): Promise<void> {
    const id = carrier.id;
    if (!id) {
      return;
    }
    await this.repository.delete(id);
  }

  private mapToDomain(entity: CarrierOrmEntity): Carrier {
    return Carrier.restore({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      active: entity.active,
      capabilities: entity.capabilities ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  private mapToPersistence(carrier: Carrier): CarrierOrmEntity {
    const plain = carrier.toObject();
    return this.repository.create({
      id: plain.id,
      code: plain.code,
      name: plain.name,
      active: plain.active,
      capabilities: plain.capabilities ?? null,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    });
  }
}
