import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


interface Appointments {
  idcita: number;
  nombre: string;
  appaterno: string;
  apmaterno: string;
  correo: string;
  telefono: number;
  servicio: string;
  fechaagendada: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private apiURL = `${environment.api.baseUrl}/api/appointments`;
    constructor(private http: HttpClient) { }

        getAppointments(): Observable<Appointments[]> {
          return this.http.get<Appointments[]>(this.apiURL);
        }

        getAppointmentsById(id: number): Observable<Appointments> {
         return this.http.get<Appointments>(`${this.apiURL}/${id}`);
        }

        createAppointments(appointments: Omit<Appointments, 'idcita'>): Observable<any> {
          return this.http.post(this.apiURL, appointments);
        }

        updateAppointments(id: number, appointments: Omit<Appointments, 'idcita'>): Observable<any> {
          return this.http.put(`${this.apiURL}/${id}`, appointments);
        }

        deleteAppointments(id: number): Observable<any> {
          return this.http.delete(`${this.apiURL}/${id}`);
        }
}
