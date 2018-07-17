import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { MEAT_API } from '../../app.api';
import { User } from './user.model';


@Injectable()
export class LoginService {
  loginUrl = `${MEAT_API.baseUrl}/login`;

  user: User;

  constructor(private http: HttpClient, private router: Router) {}

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

  handleLogin(path?: string) {
    this.router.navigate(['/login', path]);
  }
}
