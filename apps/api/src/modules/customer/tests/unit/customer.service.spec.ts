import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../../application/services/customer.service';
import { Customer } from '../../domain/entities/customer';
import { CustomerRepository } from '../../domain/repositories/customer-repository';
import { CUSTOMER_REPOSITORY } from '../../infrastructure/persistence/customer-repository.token';

const createRepositoryMock = (): jest.Mocked<CustomerRepository> => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByCode: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: jest.Mocked<CustomerRepository>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: CUSTOMER_REPOSITORY,
          useValue: createRepositoryMock(),
        },
      ],
    }).compile();

    service = moduleRef.get<CustomerService>(CustomerService);
    repository = moduleRef.get(CUSTOMER_REPOSITORY);
  });

  it('creates customer', async () => {
    repository.findByCode.mockResolvedValue(null);
    repository.save.mockImplementation(customer =>
      Promise.resolve(
        Customer.restore({
          ...customer.toObject(),
          id: '1',
        }),
      ),
    );

    const customer = await service.create({
      code: 'ACME',
      name: 'ACME Corp',
      contactEmail: 'ops@acme.com',
    });

    expect(customer).toMatchObject({ code: 'ACME', active: true });
  });
});
