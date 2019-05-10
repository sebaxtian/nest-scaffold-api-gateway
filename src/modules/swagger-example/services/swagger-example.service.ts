import { Injectable, HttpService } from '@nestjs/common';
import { SwaggerExample } from '../interfaces/swagger-example.interface';
import { SwaggerExampleDto } from '../dtos/swagger-example.dto';
import shortid = require('shortid');

@Injectable()
export class SwaggerExampleService {
  listSwaggerExample: SwaggerExample[] = [];

  constructor(private readonly httpService: HttpService) {}

  mensaje(): string {
    return 'Mensaje de Swagger Example !!';
  }

  async create(swaggerExampleDto: SwaggerExampleDto): Promise<SwaggerExample> {
    try {
      const userGithub = swaggerExampleDto.userGithub;
      const userRepos = await this.httpService
        .get('https://api.github.com/users/' + userGithub + '/repos')
        .toPromise();
      const repos: [] = userRepos.data.map(dataRepo => {
        return {
          name: dataRepo.full_name,
          description: dataRepo.description,
          url: dataRepo.url,
        };
      });
      const swaggerExample: SwaggerExample = {
        id: shortid.generate(),
        userGithub,
        userRepos: repos,
        comment: 'Repositorios de usuario en Github: ' + userGithub,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.listSwaggerExample.push(swaggerExample);
      return swaggerExample;
    } catch (error) {
      throw error;
    }
  }

  findAll(): SwaggerExample[] {
    return this.listSwaggerExample;
  }

  findOne(id: string): SwaggerExample {
    for (const swaggerExample of this.listSwaggerExample) {
      if (swaggerExample.id === id) {
        return swaggerExample;
      }
    }
    return null;
  }

  async update(id: string): Promise<SwaggerExample> {
    const swaggerExample: SwaggerExample = this.findOne(id);
    if (swaggerExample !== null) {
      const userGithub = swaggerExample.userGithub;
      try {
        const userRepos = await this.httpService
          .get('https://api.github.com/users/' + userGithub + '/repos')
          .toPromise();
        const repos: [] = userRepos.data.map(dataRepo => {
          return {
            name: dataRepo.full_name,
            description: dataRepo.description,
            url: dataRepo.url,
          };
        });
        swaggerExample.userRepos = repos;
        swaggerExample.comment =
          'Repositorios de usuario en Github Actualizado: ' + userGithub;
        swaggerExample.updatedAt = new Date().toISOString();
        // Update
        this.listSwaggerExample = this.listSwaggerExample.map(
          dataSwaggerExample => {
            if (dataSwaggerExample.id === id) {
              dataSwaggerExample = swaggerExample;
            }
            return dataSwaggerExample;
          },
        );
        return swaggerExample;
      } catch (error) {
        throw error;
      }
    } else {
      return null;
    }
  }

  remove(id: string): boolean {
    let isRemove: boolean = false;
    for (let i = 0; i < this.listSwaggerExample.length; i++) {
      const swaggerExample = this.listSwaggerExample[i];
      if (swaggerExample !== undefined && swaggerExample.id === id) {
        delete this.listSwaggerExample[i];
        isRemove = true;
      }
    }
    return isRemove;
  }
}
