import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/shopping-list';

  constructor(private http: HttpClient) {}

  // Método para adicionar um item
  adicionarItem(item: { nome: string; comprado: boolean; editando: boolean }): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  // Método para buscar todos os itens
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para excluir um item
  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
