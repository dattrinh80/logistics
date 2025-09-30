import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarrierService } from '../../application/services/carrier.service';
import { CreateCarrierDto } from '../dto/create-carrier.dto';
import { SetCarrierStatusDto } from '../dto/set-carrier-status.dto';
import { UpdateCarrierDto } from '../dto/update-carrier.dto';

@Controller('carriers')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post()
  create(@Body() dto: CreateCarrierDto) {
    return this.carrierService.create(dto);
  }

  @Get()
  findAll() {
    return this.carrierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.carrierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateCarrierDto) {
    return this.carrierService.update(id, dto);
  }

  @Patch(':id/status')
  toggle(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: SetCarrierStatusDto) {
    return this.carrierService.setActive(id, dto.active);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.carrierService.remove(id);
  }
}
