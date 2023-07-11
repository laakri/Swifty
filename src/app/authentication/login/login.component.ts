import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private UsersService: UsersService) {}

  login(loginForm: any) {
    if (loginForm.invalid) {
      console.log('Invalid form');
      return;
    }
    this.UsersService.login(
      loginForm.value.gmailname,
      loginForm.value.password
    );
  }
}
