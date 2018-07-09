import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationService } from '../../shared/messages/notification.service';

@Component({
  selector: 'mt-app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      password: this.fb.control('', [Validators.required])
    });
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        user => this.notificationService.notify(`Bem-vindo, ${user.name}`),
        (
          response // HttpErrorResponse
        ) => this.notificationService.notify(response.error.message)
      );
  }
}
