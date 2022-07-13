export class User {
  username: string;
  email: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
