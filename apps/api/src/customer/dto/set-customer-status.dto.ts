import { IsBoolean } from 'class-validator';

export class SetCustomerStatusDto {
  @IsBoolean()
  active!: boolean;
}
