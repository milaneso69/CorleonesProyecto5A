import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Clients {
  idcliente: number;
  idusuario: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  telefono: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
private apiURL = 'http://192.168.1.68:3000/api/clients';
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
