import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getShoppingList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shopping-list`);
  }

  addItem(item: { nome: string; comprado: boolean }): Observable<any> {
    return this.http.post(`${this.baseUrl}/shopping-list`, item);
  }

}
