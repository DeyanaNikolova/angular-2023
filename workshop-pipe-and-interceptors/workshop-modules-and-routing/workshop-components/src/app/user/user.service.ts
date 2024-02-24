import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;

  constructor(private http: HttpClient) {}

  USER_KEY = '[user]';
  get isLogged(): boolean {
    return !!this.user;
  }


  login(email: string, password: string) {
    return this.http
      .post<User>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    tel: string
  ) {
    return this.http.post<User>('/api/register', {
      username,
      email,
      password,
      rePassword,
      tel,
    })
    .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
    .post<User>('/api/logout', {})
    .pipe(tap(() => this.user$$.next(undefined)));
  }
}
