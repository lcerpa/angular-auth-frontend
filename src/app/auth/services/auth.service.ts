import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User, CheckTokenResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // las signals computadas son de solo lectura
  public currentUser = computed(() => this._currentUser());

  public authStatus = computed(() => this._authStatus());

  constructor() {
    setTimeout(() => {
      this.checkAuthStatus().subscribe();

    }, .300);
  }

  private setAuthentication(user: User, token: string ): boolean {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);

        return true;
  }

  register(user: User): Observable<LoginResponse> {
    const url = `${this.baseUrl}/auth/register`;
    const body = user;

    return this.http.post<LoginResponse>(url, body).pipe(
      catchError((err) => throwError(() => err.error.message ))
    )
  }


  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      // tap(({ user, token }) => {
      //   this._currentUser.set(user);
      //   this._authStatus.set(AuthStatus.authenticated);
      //   localStorage.setItem('token', token);
      //   console.log({ user, token });
      // }),

      //map(() => true),
      map(({ user, token }) => this.setAuthentication(user, token)),

      // catchError((err) => {
      //   console.log(err);
      //   return throwError(() => 'Algo no sucedio como lo esperaban');
      // })
      catchError((err) => throwError(() => err.error.message ))
    )
  }

  checkAuthStatus(): Observable<boolean>{

    const url = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${ token }`)

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        // map( ({ token, user }) => {
        //   this._currentUser.set( user );
        //   this._authStatus.set( AuthStatus.authenticated );
        //   localStorage.setItem('token', token);
        //   return true;
        // }),
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError( () => {
          this._authStatus.set( AuthStatus.noAuthenticated )
          return of(false)
        }  )
      );

  }

  logout(){
    localStorage.removeItem('token')
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.noAuthenticated );
  }

}
