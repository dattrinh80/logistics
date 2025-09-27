import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, Length } from 'class-validator';

export class CreateCarrierDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  code!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  name!: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsObject()
  capabilities?: Record<string, unknown>;
}
