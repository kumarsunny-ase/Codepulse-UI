import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginRequest } from '../models/login-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { loginResponse } from '../models/login-response';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(request: loginRequest): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

 getUser(): User | undefined {
  const email = localStorage.getItem('user-email');
  const roles = localStorage.getItem('user-roles');

  if(email && roles) {
    const user: User = {
      email: email,
      roles: roles.split(',')
    };
    return user;
  }
  return undefined;
 }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}