import { Provider } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from './customer-repository.token';
import { CustomerTypeOrmRepository } from './typeorm/customer-typeorm.repository';

export const customerRepositoryProvider: Provider = {
  provide: CUSTOMER_REPOSITORY,
  useClass: CustomerTypeOrmRepository,
};
