import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 64)
  code!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  name!: string;

  @IsEmail()
  contactEmail!: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsUrl()
  webhookUrl?: string | null;
}
