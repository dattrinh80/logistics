import { IsBoolean } from 'class-validator';

export class SetCarrierStatusDto {
  @IsBoolean()
  active!: boolean;
}
