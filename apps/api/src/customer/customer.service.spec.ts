import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

const createRepositoryMock = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: jest.Mocked<Repository<Customer>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: createRepositoryMock(),
        },
      ],
    }).compile();

    service = moduleRef.get<CustomerService>(CustomerService);
    repository = moduleRef.get(getRepositoryToken(Customer));
  });

  it('creates customer', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockImplementation(data => data as Customer);
    repository.save.mockImplementation(data => Promise.resolve({ ...(data as Customer), id: '1' }));

    const customer = await service.create({
      code: 'ACME',
      name: 'ACME Corp',
      contactEmail: 'ops@acme.com',
    });

    expect(customer).toMatchObject({ code: 'ACME', active: true });
  });
});
