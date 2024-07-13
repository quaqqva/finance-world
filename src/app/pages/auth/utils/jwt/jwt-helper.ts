import crypto from 'crypto-js';
import { jwtDecode } from 'jwt-decode';

export class JwtHelper {
  private static JWT_SECRET = 'simbirsoft';

  public static CheckIfTokenIsValid(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      if (decoded === null) {
        return false;
      }
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      if (decoded.exp! > currentTimeInSeconds) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  public static GenerateAccessToken(): string {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const twentyMinutesInSeconds = 20 * 60;
    const payload = {
      exp: currentTimeInSeconds + twentyMinutesInSeconds,
    };
    return this.GenerateToken(payload);
  }

  public static GenerateRefreshToken(): string {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    const payload = {
      exp: currentTimeInSeconds + oneWeekInSeconds,
    };
    return this.GenerateToken(payload);
  }

  private static GenerateToken(payload: object): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const encodedHeader = JwtHelper.Base64urlEncode(
      crypto.enc.Utf8.parse(JSON.stringify(header)),
    );
    const encodedPayload = JwtHelper.Base64urlEncode(
      crypto.enc.Utf8.parse(JSON.stringify(payload)),
    );

    const signature = JwtHelper.Base64urlEncode(
      crypto.HmacSHA256(
        `${encodedHeader}.${encodedPayload}`,
        JwtHelper.JWT_SECRET,
      ),
    );

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  private static Base64urlEncode(wordArray: crypto.lib.WordArray) {
    return wordArray
      .toString(crypto.enc.Base64)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}
