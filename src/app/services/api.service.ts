import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // URL da API simulada

  constructor(private http: HttpClient) {}

  // Método para obter a lista de compras
  getShoppingList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shopping-list`);
  }

  // Método para adicionar um novo item à lista de compras
  addItem(item: { nome: string; comprado: boolean }): Observable<any> {
    return this.http.post(`${this.baseUrl}/shopping-list`, item);
  }

}
