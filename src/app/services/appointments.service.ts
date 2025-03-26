import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Appointments {
  idcita: number;
  idcliente: number;
  idservicio: number;
  fechaagendada: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private apiURL = 'http://10.0.179.59:3000/api/appointments';
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
