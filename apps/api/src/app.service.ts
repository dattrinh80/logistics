import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getStatus() {
    return {
      name: this.configService.get<string>('app.name'),
      version: process.env.npm_package_version ?? '0.0.0',
      environment: this.configService.get<string>('app.environment'),
    };
  }
}
