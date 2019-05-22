import { UserRepo } from './user-repo.interface';
export interface SwaggerExample {
  readonly id: string;
  readonly userGithub: string;
  userRepos: UserRepo[];
  comment: string;
  readonly createdAt: string;
  updatedAt: string;
}
