import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/login.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  loginError: string = ''; // Add an error message property

  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginService.Login(this.user).subscribe(
        (res) => {
          if (res.accessToken) {
            const token = localStorage.setItem('token', res.accessToken);
            this.router.navigate(['company']);
          } else {
            // Set the error message
            // this.loginError = 'Login failed: ' + res.message;
            this.loginError = 'Login failed: Please check the username and password';
          }
        },
        (error) => {
          // Handle error in case of HTTP request failure
          // this.loginError = 'Login failed: ' + error.message;
          this.loginError = 'Login failed: Please check the username and password';
        }
      );
    }
  }
}
