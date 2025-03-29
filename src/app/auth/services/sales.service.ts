import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Sales {
  idventa: number;
  cliente: string;
  fechaventa: string;
  total: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private apiURL = `${environment.api.baseUrl}/api/sales`;

  constructor(private http: HttpClient) { }

getSales(): Observable<Sales[]> {
          return this.http.get<Sales[]>(this.apiURL);
        }

        getSalesById(id: number): Observable<Sales> {
         return this.http.get<Sales>(`${this.apiURL}/${id}`);
        }

        createSales(sales: Omit<Sales, 'idventa'>): Observable<any> {
          return this.http.post(this.apiURL, sales);
        }

        updateSales(id: number, sales: Omit<Sales, 'idventa'>): Observable<any> {
          return this.http.put(`${this.apiURL}/${id}`, sales);
        }

        deleteSales(id: number): Observable<any> {
          return this.http.delete(`${this.apiURL}/${id}`);
        }
}
