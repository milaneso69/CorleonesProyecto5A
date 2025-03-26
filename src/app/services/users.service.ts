import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Users {
  idusuario: number;
  correo: string;
  contrasenia: string;
  created_at: string;
  updated_at: string;
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = 'http://192.168.1.68:3000/api/users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiURL);
  }

   getUsersById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiURL}/${id}`);
  }

  createUsers(users: Omit<Users, 'idusuario'>): Observable<any> {
    return this.http.post(this.apiURL, users);
  }

  updateUsers(id: number, users: Omit<Users, 'idusuario'>): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, users);
  }

  deleteUsers(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
