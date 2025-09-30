import { Test, TestingModule } from '@nestjs/testing';
import { CarrierService } from '../../application/services/carrier.service';
import { Carrier } from '../../domain/entities/carrier';
import { CarrierRepository } from '../../domain/repositories/carrier-repository';
import { CARRIER_REPOSITORY } from '../../infrastructure/persistence/carrier-repository.token';

const createRepositoryMock = (): jest.Mocked<CarrierRepository> => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByCode: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('CarrierService', () => {
  let service: CarrierService;
  let repository: jest.Mocked<CarrierRepository>;

  beforeEach(async () => {
    repository = createRepositoryMock();

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CarrierService,
        {
          provide: CARRIER_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    service = moduleRef.get<CarrierService>(CarrierService);
  });

  it('creates carrier', async () => {
    repository.findByCode.mockResolvedValue(null);
    repository.save.mockImplementation(carrier =>
      Promise.resolve(
        Carrier.restore({
          ...carrier.toObject(),
          id: '1',
        }),
      ),
    );

    const carrier = await service.create({ code: 'DHL', name: 'DHL' });
    expect(carrier).toMatchObject({ code: 'DHL', name: 'DHL', id: '1' });
  });

  it('throws when duplicate code', async () => {
    repository.findByCode.mockResolvedValue(
      Carrier.restore({ id: '1', code: 'DHL', name: 'DHL', active: true }),
    );

    await expect(service.create({ code: 'DHL', name: 'Dup' })).rejects.toThrow(
      'Carrier with code DHL already exists',
    );
  });
});
