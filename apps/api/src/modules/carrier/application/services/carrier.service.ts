import { Inject, Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCarrierDto } from '../../api/dto/create-carrier.dto';
import { UpdateCarrierDto } from '../../api/dto/update-carrier.dto';
import { Carrier } from '../../domain/entities/carrier';
import { CarrierRepository } from '../../domain/repositories/carrier-repository';
import { CARRIER_REPOSITORY } from '../../infrastructure/persistence/carrier-repository.token';

@Injectable()
export class CarrierService {
  constructor(
    @Inject(CARRIER_REPOSITORY)
    private readonly carrierRepository: CarrierRepository,
  ) {}

  async create(dto: CreateCarrierDto): Promise<Carrier> {
    const existing = await this.carrierRepository.findByCode(dto.code);
    if (existing) {
      throw new ConflictException(`Carrier with code ${dto.code} already exists`);
    }

    const carrier = Carrier.create({
      code: dto.code,
      name: dto.name,
      active: dto.active,
      capabilities: dto.capabilities,
    });

    return this.carrierRepository.save(carrier);
  }

  async findAll(): Promise<Carrier[]> {
    return this.carrierRepository.findAll();
  }

  async findOne(id: string): Promise<Carrier> {
    const carrier = await this.carrierRepository.findById(id);
    if (!carrier) {
      throw new NotFoundException(`Carrier ${id} not found`);
    }
    return carrier;
  }

  async update(id: string, dto: UpdateCarrierDto): Promise<Carrier> {
    const carrier = await this.findOne(id);

    if (dto.code && dto.code !== carrier.code) {
      const existing = await this.carrierRepository.findByCode(dto.code);
      if (existing) {
        throw new ConflictException(`Carrier with code ${dto.code} already exists`);
      }
      carrier.code = dto.code;
    }

    if (dto.name !== undefined) {
      carrier.name = dto.name;
    }

    if (dto.active !== undefined) {
      carrier.active = dto.active;
    }

    if (dto.capabilities !== undefined) {
      carrier.capabilities = dto.capabilities;
    }

    return this.carrierRepository.save(carrier);
  }

  async setActive(id: string, active: boolean): Promise<Carrier> {
    const carrier = await this.findOne(id);
    carrier.active = active;
    return this.carrierRepository.save(carrier);
  }

  async remove(id: string): Promise<void> {
    const carrier = await this.findOne(id);
    await this.carrierRepository.remove(carrier);
  }
}
