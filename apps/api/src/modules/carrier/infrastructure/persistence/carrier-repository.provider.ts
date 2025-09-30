import { Provider } from '@nestjs/common';
import { CARRIER_REPOSITORY } from './carrier-repository.token';
import { CarrierTypeOrmRepository } from './typeorm/carrier-typeorm.repository';

export const carrierRepositoryProvider: Provider = {
  provide: CARRIER_REPOSITORY,
  useClass: CarrierTypeOrmRepository,
};
