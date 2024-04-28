export default class Login {
  static readonly type = '[Auth] Login';

  constructor(
    public login: string,
    public password: string,
  ) {}
}
