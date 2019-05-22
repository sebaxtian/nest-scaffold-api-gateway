import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerExampleService } from './swagger-example.service';
import { getSwaggerExampleMock } from '../interfaces/swagger-example.mock';
import { HttpModule, HttpService } from '@nestjs/common';
import { SwaggerExample } from '../interfaces/swagger-example.interface';
import { UserRepo } from '../interfaces/user-repo.interface';
import shortid = require('shortid');

describe('SwaggerExampleService', () => {
  let service: SwaggerExampleService;

  // Usuario Github
  let userGithub: string = 'sebaxtian';
  // Repositorios de Usuario Github
  let userRepos: UserRepo[] = [];

  /**
   * Funcion auxiliar para obtener un usuario de Github aleatorio
   */
  const getUserGithub = async (): Promise<string> => {
    try {
      const httpService: HttpService = new HttpService();
      const randomPage = await httpService
        .get(
          'https://api.github.com/users?since=' +
            Math.floor(Math.random() * (100 - 1) + 1),
        )
        .toPromise();
      // console.log('randomPage.data: ', randomPage.data);
      const randomUser =
        randomPage.data[
          Math.floor(Math.random() * (randomPage.data.length - 1) + 1)
        ];
      // console.log('randomUser: ', randomUser);
      return randomUser.login;
    } catch (error) {
      // console.log('ERROR: getUserGithub: ', error);
      throw error;
    }
  };
  const getUserRepos = async (userName: string): Promise<UserRepo[]> => {
    try {
      const httpService: HttpService = new HttpService();
      const repos = await httpService
        .get('https://api.github.com/users/' + userName + '/repos')
        .toPromise();
      const reposUser: UserRepo[] = repos.data.map(dataRepo => {
        const userRepo: UserRepo = {
          name: dataRepo.full_name,
          description: dataRepo.description,
          url: dataRepo.url,
        };
        return userRepo;
      });
      return reposUser;
    } catch (error) {
      throw error;
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SwaggerExampleService],
    }).compile();

    service = module.get<SwaggerExampleService>(SwaggerExampleService);

    userGithub = await getUserGithub();
    userRepos = await getUserRepos(userGithub);
    // console.log('userGithub: ', userGithub);
    // console.log('userRepos: ', userRepos);
  });

  describe('mensaje', () => {
    it('should be mensaje a swagger-example', () => {
      const mensajeTesting: string = 'Mensaje de Swagger Example !!';
      const mensaje: string = service.mensaje();
      expect(mensaje).toBe(mensajeTesting);
    });
  });

  describe('create', () => {
    it('should be create a swagger-example', async () => {
      const swaggerExampleTesting: SwaggerExample = await getSwaggerExampleMock(
        {
          userGithub,
          userRepos,
        },
      );
      const swaggerExample: SwaggerExample = await service.create({
        userGithub: swaggerExampleTesting.userGithub,
      });
      // console.log('swaggerExample: ', swaggerExample);
      expect(shortid.isValid(swaggerExample.id)).toBe(true);
      expect(swaggerExample.userGithub).toBe(swaggerExampleTesting.userGithub);
      expect(swaggerExample.userRepos).toEqual(swaggerExampleTesting.userRepos);
      expect(swaggerExample.comment).toBe(
        'Repositorios de usuario en Github: ' +
          swaggerExampleTesting.userGithub,
      );
      // tslint:disable-next-line: max-line-length
      expect(swaggerExample.createdAt).toEqual(
        expect.stringMatching(
          /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
        ),
      );
      // tslint:disable-next-line: max-line-length
      expect(swaggerExample.updatedAt).toEqual(
        expect.stringMatching(
          /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should be findAll a swagger-example', async () => {
      await service.create({
        userGithub,
      });
      // console.log('swaggerExampleTesting: ', swaggerExampleTesting);
      const listSwaggerExample: SwaggerExample[] = service.findAll();
      // console.log('listSwaggerExample: ', listSwaggerExample);
      expect(listSwaggerExample).not.toBe(null);
      expect(listSwaggerExample.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('findOne', () => {
    it('should be findOne a swagger-example', async () => {
      const swaggerExampleTesting: SwaggerExample = await service.create({
        userGithub,
      });
      const swaggerExample: SwaggerExample = service.findOne(
        swaggerExampleTesting.id,
      );
      expect(shortid.isValid(swaggerExampleTesting.id)).toBe(true);
      if (swaggerExample != null) {
        expect(swaggerExample.id).toBe(swaggerExampleTesting.id);
      }
    });
  });

  describe('update', () => {
    it('should be update a swagger-example', async () => {
      const swaggerExampleTesting: SwaggerExample = await service.create({
        userGithub,
      });
      const swaggerExample: SwaggerExample = await service.update(
        swaggerExampleTesting.id,
      );
      expect(shortid.isValid(swaggerExampleTesting.id)).toBe(true);
      if (swaggerExample != null) {
        expect(swaggerExample.id).toBe(swaggerExampleTesting.id);
        expect(swaggerExample.comment).toBe(
          'Repositorios de usuario en Github Actualizado: ' +
            swaggerExampleTesting.userGithub,
        );
        expect(swaggerExample.updatedAt).not.toBe(swaggerExample.createdAt);
        // tslint:disable-next-line: max-line-length
        expect(swaggerExample.createdAt).toEqual(
          expect.stringMatching(
            /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
          ),
        );
        // tslint:disable-next-line: max-line-length
        expect(swaggerExample.updatedAt).toEqual(
          expect.stringMatching(
            /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/,
          ),
        );
      }
    });
  });

  describe('remove', () => {
    it('should be remove a swagger-example', async () => {
      const swaggerExampleTesting: SwaggerExample = await service.create({
        userGithub,
      });
      const isRemove: boolean = service.remove(swaggerExampleTesting.id);
      expect(shortid.isValid(swaggerExampleTesting.id)).toBe(true);
      expect(isRemove).toBe(true);
    });
  });
});
