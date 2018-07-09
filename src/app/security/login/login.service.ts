import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MEAT_API } from '../../app.api';
import { User } from './user.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService {
  loginUrl = `${MEAT_API.baseUrl}/login`;

  user: User;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.loginUrl}`, {
        email: email,
        password: password
      })
      .pipe(tap(user => (this.user = user)));
  }
}
