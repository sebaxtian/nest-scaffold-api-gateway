import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from './helloworld.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('helloworld')
@Controller()
export class HelloWorldController {
  constructor(private readonly helloworldService: HelloWorldService) {}

  @Get()
  getHello(): string {
    return this.helloworldService.getHello();
  }
}
