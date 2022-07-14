import { Exclude } from 'class-transformer';

export class User {
  username: string;
  email: string;

  @Exclude()
  password: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
