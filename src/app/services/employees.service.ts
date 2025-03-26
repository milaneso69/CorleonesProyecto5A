import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Employees {
  idempleado: number;
  idusuario: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  telefono: number;
  nss: number;
  rfc: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiURL = 'http://10.0.179.59:3000/api/employees';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employees[]> {
      return this.http.get<Employees[]>(this.apiURL);
    }
  
     getEmployeesById(id: number): Observable<Employees> {
      return this.http.get<Employees>(`${this.apiURL}/${id}`);
    }
  
    createEmployees(employees: Omit<Employees, 'idempleado'>): Observable<any> {
      return this.http.post(this.apiURL, employees);
    }
  
    updateEmployees(id: number, employees: Omit<Employees, 'idempleado'>): Observable<any> {
      return this.http.put(`${this.apiURL}/${id}`, employees);
    }
  
    deleteEmployees(id: number): Observable<any> {
      return this.http.delete(`${this.apiURL}/${id}`);
    }

}
