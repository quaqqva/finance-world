import { RelativeCurrency } from '../../../pages/home/models/relative-currencies.enum';

export class ChangeRelativeCurrency {
  public static readonly type = '[Charts] Change Relative Currency';

  public constructor(public relativeCurrency: RelativeCurrency) {}
}
