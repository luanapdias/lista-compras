import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/shopping-list';

  constructor(private http: HttpClient) {}

  getShoppingList(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, item);
  }
}
