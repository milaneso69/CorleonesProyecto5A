import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Clients {
  idcliente: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  telefono: number;
  correo: string;
  contrasenia: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
private apiURL = `${environment.api.baseUrl}/api/clients`;
  constructor(private http: HttpClient) { }

  getClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.apiURL);
  }

   getClientsById(id: number): Observable<Clients> {
    return this.http.get<Clients>(`${this.apiURL}/${id}`);
  }

  createClients(clients: Omit<Clients, 'idcliente'>): Observable<any> {
    return this.http.post(this.apiURL, clients);
  }

  updateClients(id: number, clients: Omit<Clients, 'idcliente'>): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, clients);
  }

  deleteClients(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
