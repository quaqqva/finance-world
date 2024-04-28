import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthToken } from '../../models/auth-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(login: string, password: string) {
    const tokens = await this.httpClient.post<AuthToken>('pair_settings', {
      login,
      password,
    });
  }
}
