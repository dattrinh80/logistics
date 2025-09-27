import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'app.name') {
                return 'logistics-api';
              }
              if (key === 'app.environment') {
                return 'test';
              }
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should return app status payload', () => {
    const status = appController.getRoot();
    expect(status).toMatchObject({ name: 'logistics-api', environment: 'test' });
  });
});
