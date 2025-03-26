import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Services {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiURL = 'http://10.0.179.59:3000/api/services';
    constructor(private http: HttpClient) { }
  
    getServices(): Observable<Services[]> {
      return this.http.get<Services[]>(this.apiURL);
    }
  
     getServicesById(id: number): Observable<Services> {
      return this.http.get<Services>(`${this.apiURL}/${id}`);
    }
  
    createServices(services: Omit<Services, 'idservicio'>): Observable<any> {
      return this.http.post(this.apiURL, services);
    }
  
    updateServices(id: number, services: Omit<Services, 'idservicio'>): Observable<any> {
      return this.http.put(`${this.apiURL}/${id}`, services);
    }
  
    deleteServices(id: number): Observable<any> {
      return this.http.delete(`${this.apiURL}/${id}`);
    }
  }