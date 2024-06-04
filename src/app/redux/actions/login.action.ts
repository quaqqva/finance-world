export class Login {
  public static readonly type = '[Auth] Login';

  public constructor(
    public login: string,
    public password: string,
  ) {}
}
