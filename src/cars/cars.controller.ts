import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CreateCarDto } from './dto/create-cars.dto';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file) {
    try {
      return await this.carsService.create(file);
    } catch (error) {
      console.error(error);
      return `error in controller ${error}`;
    }
  }

  @Get()
  async findAll(): Promise<CreateCarDto[]> {
    try {
      return await this.carsService.findAll();
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateCarDto> {
    try {
      return this.carsService.findOne(id);
    } catch (error) {
      return error;
    }
  }
}
