export class ChangeCurrency {
  public static readonly type = '[Charts] Change Currency';

  public constructor(public currency: string) {}
}
