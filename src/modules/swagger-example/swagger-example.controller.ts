import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Body,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SwaggerExampleService } from './services/swagger-example.service';
import { ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { SwaggerExampleDto } from './dtos/swagger-example.dto';
import { SwaggerExample } from './interfaces/swagger-example.interface';

@ApiUseTags('swagger-example')
@Controller('swagger-example')
export class SwaggerExampleController {
  constructor(private readonly swaggerExampleService: SwaggerExampleService) {}

  @Get('mensaje')
  async getMensaje(@Res() res) {
    try {
      const mensaje = await this.swaggerExampleService.mensaje();
      // console.log('getMensaje: ', mensaje);
      // Response al Cliente
      res.status(HttpStatus.OK).json(mensaje);
    } catch (error) {
      // console.error('getMensaje [error]: ', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Post()
  async create(@Body() swaggerExampleDto: SwaggerExampleDto, @Res() res) {
    try {
      const swaggerExample: SwaggerExample = await this.swaggerExampleService.create(
        swaggerExampleDto,
      );
      // console.log('create: ', swaggerExample);
      // Response al Cliente
      res.status(HttpStatus.OK).json(swaggerExample);
    } catch (error) {
      // console.error('create [error]: ', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const listSwaggerExample: SwaggerExample[] = await this.swaggerExampleService.findAll();
      // console.log('findAll: ', listSwaggerExample);
      // Response al Cliente
      res.status(HttpStatus.OK).json(listSwaggerExample);
    } catch (error) {
      // console.error('findAll [error]: ', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Get(':id')
  @ApiImplicitParam({ name: 'id' })
  async findOne(@Param('id') id, @Res() res) {
    try {
      const swaggerExample: SwaggerExample = await this.swaggerExampleService.findOne(
        id,
      );
      // console.log('findOne: ', swaggerExample);
      // Response al Cliente
      res.status(HttpStatus.OK).json(swaggerExample);
    } catch (error) {
      // console.error('findOne [error]: ', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Put(':id')
  @ApiImplicitParam({ name: 'id' })
  async update(@Param('id') id, @Res() res) {
    try {
      const swaggerExample: SwaggerExample = await this.swaggerExampleService.update(
        id,
      );
      // console.log('update: ', swaggerExample);
      // Response al Cliente
      res.status(HttpStatus.OK).json(swaggerExample);
    } catch (error) {
      // console.error('update [error]: ', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  @Delete(':id')
  @ApiImplicitParam({ name: 'id' })
  async remove(@Param('id') id, @Res() res) {
    try {
      const isRemove: boolean = await this.swaggerExampleService.remove(id);
      // console.log('remove: ', isRemove);
      // Response al Cliente
      res.status(HttpStatus.OK).json(isRemove);
    } catch (error) {
      // console.error('remove [error]: ', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
