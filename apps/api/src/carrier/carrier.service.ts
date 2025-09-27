import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { Carrier } from './carrier.entity';

@Injectable()
export class CarrierService {
  constructor(
    @InjectRepository(Carrier)
    private readonly carrierRepository: Repository<Carrier>,
  ) {}

  async create(dto: CreateCarrierDto): Promise<Carrier> {
    const existing = await this.carrierRepository.findOne({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException(`Carrier with code ${dto.code} already exists`);
    }
    const carrier = this.carrierRepository.create({
      ...dto,
      active: dto.active ?? true,
    });
    return this.carrierRepository.save(carrier);
  }

  async findAll(): Promise<Carrier[]> {
    return this.carrierRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<Carrier> {
    const carrier = await this.carrierRepository.findOne({ where: { id } });
    if (!carrier) {
      throw new NotFoundException(`Carrier ${id} not found`);
    }
    return carrier;
  }

  async update(id: string, dto: UpdateCarrierDto): Promise<Carrier> {
    const carrier = await this.findOne(id);

    if (dto.code && dto.code !== carrier.code) {
      const existing = await this.carrierRepository.findOne({ where: { code: dto.code } });
      if (existing) {
        throw new ConflictException(`Carrier with code ${dto.code} already exists`);
      }
    }

    Object.assign(carrier, dto);
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
