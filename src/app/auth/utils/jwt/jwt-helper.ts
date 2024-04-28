import { sign } from 'jsonwebtoken';

export default class JwtHelper {
  private static JWT_SECRET = 'simbirsoft';

  public static GenerateAccessToken(): string {
    return sign({}, JwtHelper.JWT_SECRET, { expiresIn: '2h' });
  }

  public static GenerateRefreshToken(): string {
    return sign({}, JwtHelper.JWT_SECRET, { expiresIn: '7d' });
  }
}
