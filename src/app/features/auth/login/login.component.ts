import { Component } from '@angular/core';
import { loginRequest } from '../models/login-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: loginRequest

  constructor(private authApi: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.authApi.login(this.model)
    .subscribe({
      next: (response) => {
        // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, 
        '/', undefined, true, 'Strict');

        // Set User
        this.authApi.setUser({
          email: response.email,
          roles: response.roles
        });

        // Redirect to the home page
        this.router.navigateByUrl('/');
      }
    })
  }
}
