import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Products {
  idproducto: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
  created_at: string;
  updated_at: string;
} 

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = `${environment.api.baseUrl}/api/products`;
  constructor(private http: HttpClient) { }

    getProducts(): Observable<Products[]> {
      return this.http.get<Products[]>(this.apiURL);
    }
  
     getProductsById(id: number): Observable<Products> {
      return this.http.get<Products>(`${this.apiURL}/${id}`);
    }
  
    createProducts(products: Omit<Products, 'idproducto'>): Observable<any> {
      return this.http.post(this.apiURL, products);
    }
  
    updateProducts(id: number, products: Omit<Products, 'idproducto'>): Observable<any> {
      return this.http.put(`${this.apiURL}/${id}`, products);
    }
  
    deleteProducts(id: number): Observable<any> {
      return this.http.delete(`${this.apiURL}/${id}`);
    }
}
