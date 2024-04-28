import crypto from 'crypto-js';
import { jwtDecode } from 'jwt-decode';

export default class JwtHelper {
  private static JWT_SECRET = 'simbirsoft';

  public static CheckIfTokenIsValid(token: string): boolean {
    try {
      const decoded = jwtDecode(token);
      if (decoded === null) {
        return false;
      }
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp! > currentTime) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  public static GenerateAccessToken(): string {
    const accessTokenExpTime = 20 * 60;
    const payload = {
      exp: Math.floor(Date.now() / 1000) + accessTokenExpTime,
    };
    return this.GenerateToken(payload);
  }

  public static GenerateRefreshToken(): string {
    const refreshTokenExpTime = 7 * 24 * 60 * 60;
    const payload = {
      exp: Math.floor(Date.now() / 1000) + refreshTokenExpTime,
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
