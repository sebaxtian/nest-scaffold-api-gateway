import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class HelloWorldService {
  private appName: string;
  private portApi: number;

  constructor(config: ConfigService) {
    this.appName = config.appName;
    this.portApi = config.portApi;
  }

  getAppName(): string {
    return this.appName;
  }

  getPortApi(): number {
    return this.portApi;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
