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
  loading = false;

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

        this.otpSent = true;
        setTimeout(() => {

          alert(res.message);

        }, 0);

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

  /*Forgot Password Modal*/
  showForgotPassword = false;

  forgotEmail = '';

  forgotOTP = '';

  forgotOtpSent = false;

  forgotOtpVerified = false;

  newPassword = '';

  confirmPassword = '';

  openForgotPassword(event: Event) {

    event.preventDefault();

    this.showForgotPassword = true;

  }

  closeForgotPassword() {

    this.showForgotPassword = false;

    this.forgotEmail = '';
    this.forgotOTP = '';
    this.newPassword = '';
    this.confirmPassword = '';

    this.forgotOtpSent = false;
    this.forgotOtpVerified = false;

  }

  sendForgotOTP() {

    if (!this.forgotEmail) {
      alert("Enter Email");
      return;
    }

    this.loading = true;

    this.auth.forgotPassword({
      email: this.forgotEmail
    }).subscribe({

      next: (res: any) => {

        this.loading = false;

        this.forgotOtpSent = true;

        // setTimeout(() => {

        //   alert(res.message);

        // }, 0);
      },

      error: (err) => {

        this.loading = false;

        alert(
          err.error.message ||
          "Failed to send OTP"
        );

      }

    });

  }

  verifyForgotOTP() {

    if (!this.forgotOTP) {

      alert("Enter OTP");

      return;

    }

    this.auth.verifyForgotOtp({

      email: this.forgotEmail,
      otp: this.forgotOTP

    }).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.forgotOtpVerified = true;

      },

      error: (err) => {

        alert(err.error.message);

      }

    });

  }

  updatePassword() {

    if (!this.newPassword || !this.confirmPassword) {
      alert("Enter Password");
      return;
    }

    if (this.newPassword !== this.confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    const payload = {

      email: this.forgotEmail,
      password: this.newPassword,
      confirmPassword: this.confirmPassword

    };

    this.auth.resetPassword(payload).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.closeForgotPassword();

      },

      error: (err) => {

        alert(
          err.error.message ||
          "Password reset failed"
        );

      }

    });

  }

}