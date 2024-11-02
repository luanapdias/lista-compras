import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
  imports: [CommonModule, FormsModule], 
})
export class ListaComprasComponent implements OnInit {
  novoItem: string = '';
  items: { id: number; nome: string; comprado: boolean; editando: boolean }[] = [];
  isAuthenticated: boolean = false;

  constructor(
    private apiService: ApiService,
    private shoppingService: ShoppingListService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
      if (this.isAuthenticated) {
        this.shoppingService.getItems().subscribe((data) => {
          this.items = data;
        });
      } else {
        this.auth.loginWithRedirect();
      }
    });
  }

  adicionarItem() {
    if (this.novoItem.trim() !== '') {
      const newItem = { nome: this.novoItem, comprado: false, editando: false };
      this.shoppingService.adicionarItem(newItem).subscribe((item) => {
        this.items.push(item);
        this.novoItem = '';
      });
    }
  }

  editarItem(item: { nome: string; comprado: boolean; editando: boolean }) {
    item.editando = true;
  }

  salvarEdicao(item: { nome: string; comprado: boolean; editando: boolean }) {
    if (item.nome.trim() !== '') {
      item.editando = false;
    }
  }

  marcarComoComprado(item: { nome: string; comprado: boolean; editando: boolean }) {
    if (!item.editando && item.nome.trim() !== '') {
      item.comprado = !item.comprado;
    }
  }

  excluirItem(index: number) {
    const itemToDelete = this.items[index];
    this.shoppingService.deleteItem(itemToDelete.id).subscribe({
      next: () => {
        this.items.splice(index, 1);
        console.log('Item excluído com sucesso');
      },
      error: (err) => {
        console.error('Error deleting item', err);
      },
    });
  }
}
