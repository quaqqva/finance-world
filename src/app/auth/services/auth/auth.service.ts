import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthToken } from '../../models/auth-token.model';
import ENDPOINTS from '../../../shared/enums/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public login(login: string, password: string): Observable<AuthToken> {
    return this.httpClient.post<AuthToken>(ENDPOINTS.AUTH, {
      login,
      password,
    });
  }
}
