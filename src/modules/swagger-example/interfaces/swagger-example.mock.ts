import { SwaggerExample } from './swagger-example.interface';
import { getUserRepoMock } from './user-repo.mock';
// import { UserRepo } from './user-repo.interface';
import shortid = require('shortid');
/**
 * Crea una instancia Mock de SwaggerExample
 */
const getDefaults = async (): Promise<SwaggerExample> => ({
  id: shortid.generate(),
  userGithub: 'sebaxtian',
  userRepos: [await getUserRepoMock()],
  comment: 'Mock de SwaggerExample por defecto.',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
/**
 * Constructor de Instancia Mock de SwaggerExample
 *
 * https://itnext.io/mocking-in-typescript-a97267f7cea9
 *
 * @export
 * @function getSwaggerExampleMock
 */
export const getSwaggerExampleMock = async (
  p?: Partial<SwaggerExample>,
): Promise<SwaggerExample> => ({
  ...await getDefaults(),
  ...p,
});
