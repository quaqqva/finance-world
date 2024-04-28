import { sign } from 'jsonwebtoken';

export default class JwtHelper {
  private static JWT_SECRET = 'simbirsoft';

  public static GenerateToken(): string {
    return sign(
      {
        iat: Math.floor(Date.now() / 1000) - 30,
      },
      JwtHelper.JWT_SECRET,
    );
  }
}
