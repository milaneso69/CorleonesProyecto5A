import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface LoginResponse {
  token: string;
  user: {
    idusuario: number;
    correo: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_CURRENT = 'USER_CURRENT';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { correo: string; contrasenia: string }): Observable<LoginResponse> {
    const params = new URLSearchParams();
    params.set('correo', credentials.correo);
    params.set('contrasenia', credentials.contrasenia);

    return this.http.get<LoginResponse>(`${environment.api.baseUrl}/api/users?${params.toString()}`)
      .pipe(
        tap(response => {
          if (!response?.token) {
            throw new Error('Respuesta inválida del servidor');
          }
          this.doLoginUser(response);
        }),
        catchError(error => {
          console.error('Error en login:', error);
          return throwError(() => new Error(
            error.error?.message || 
            'Error al iniciar sesión. Verifique sus credenciales.'
          ));
        })
      );
  }

  logout(): void {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getJwtToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(response: LoginResponse): void {
    localStorage.setItem(this.JWT_TOKEN, response.token);
    localStorage.setItem(this.USER_CURRENT, JSON.stringify(response.user));
  }

  private doLogoutUser(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USER_CURRENT);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.USER_CURRENT);
    return user ? JSON.parse(user) : null;
  }
}