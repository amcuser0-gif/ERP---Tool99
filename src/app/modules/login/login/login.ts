import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  otp = '';

  otpSent = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  login() {

    if (!this.email || !this.password) {
      alert('Enter Email and Password');
      return;
    }

    const payload = {
      email: this.email,
      password: this.password
    };

    this.auth.login(payload).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.otpSent = true;
      },

      error: (err) => {

        alert(
          err.error.message ||
          'Login Failed'
        );

      }

    });

  }

  verifyOTP() {

    const payload = {
      email: this.email,
      otp: this.otp
    };

    this.auth.verifyOtp(payload).subscribe({

      next: (res: any) => {

        console.log('Verify OTP Response:', res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        console.log('Saved User:', localStorage.getItem('user'));

        alert('Login Successful');

        this.router.navigate(['/dashboard']);
      },

      error: (err) => {

        alert(
          err.error.message ||
          'Invalid OTP'
        );

      }

    });

  }

}