import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrier } from './carrier.entity';
import { CarrierService } from './carrier.service';

const createRepositoryMock = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

describe('CarrierService', () => {
  let service: CarrierService;
  let repository: jest.Mocked<Repository<Carrier>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CarrierService,
        {
          provide: getRepositoryToken(Carrier),
          useValue: createRepositoryMock(),
        },
      ],
    }).compile();

    service = moduleRef.get<CarrierService>(CarrierService);
    repository = moduleRef.get(getRepositoryToken(Carrier));
  });

  it('creates carrier', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockImplementation(data => data as Carrier);
    repository.save.mockImplementation(data => Promise.resolve({ ...(data as Carrier), id: '1' }));

    const carrier = await service.create({ code: 'DHL', name: 'DHL' });
    expect(carrier).toMatchObject({ code: 'DHL', name: 'DHL', id: '1' });
  });

  it('throws when duplicate code', async () => {
    repository.findOne.mockResolvedValue({ id: '1' } as Carrier);

    await expect(service.create({ code: 'DHL', name: 'Dup' })).rejects.toThrow(
      'Carrier with code DHL already exists',
    );
  });
});
