import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:4001/api/user';
  private platformId = inject(PLATFORM_ID);


  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(
      `${this.api}/login`,
      data
    );
  }

  verifyOtp(data: any) {
    return this.http.post(
      `${this.api}/verify-otp`,
      data
    );
  }

  getUser() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  saveUser(user: any) {
     if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

}