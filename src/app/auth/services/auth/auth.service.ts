import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthToken } from '../../models/auth-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public login(login: string, password: string): Observable<AuthToken> {
    return this.httpClient.post<AuthToken>('pair_settings', {
      login,
      password,
    });
  }
}
