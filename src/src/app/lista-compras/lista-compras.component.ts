import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ShoppingListService } from '../services/shopping-list.service';

interface Item {
  id?: number;
  title: string;
  userId: number;
  included: boolean;
  editing: boolean;
}

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ListaComprasComponent {
  novoItem: string = '';
  items: Item[] = [];

  constructor(
    private shoppingService: ShoppingListService,
    private http: HttpClient
  ) {
    this.obterItems();
  }

  // Método para obter itens da API
  obterItems() {
    const userId = 1;  // Defina o userId corretamente aqui
    this.shoppingService.getShoppingList(userId).subscribe({
      next: (data) => {
        this.items = data;
        console.log('Itens carregados com sucesso');
      },
      error: (error) => {
        console.error('Erro ao buscar itens:', error);
        alert('Erro ao carregar a lista de compras');
      }
    });
  }  

  // Método para adicionar item
  adicionarItem() {
    const userId = 1;  // Defina o userId corretamente aqui

    if (this.novoItem && this.novoItem.trim() !== '') {
      const itemAdded: Item = { title: this.novoItem, userId: userId, included: false, editing: false };

      this.shoppingService.addItem(itemAdded).subscribe({
        next: (data) => {
          this.items.push(data);
          this.novoItem = '';
        },
        error: (error) => {
          console.error('Erro ao adicionar item:', error);
          alert('Erro ao adicionar o item');
        }
      });
    }
  }

  // Método para editar item
  editarItem(item: Item) {
    item.editing = true;
  }

  // Método para salvar edição de item
  salvarEdicao(item: Item) {
    if (item.id && item.title && item.title.trim() !== '') {
      item.editing = false;
      this.shoppingService.updateItem(item.id, { title: item.title }).subscribe({
        next: () => {
          console.log('Item atualizado com sucesso');
        },
        error: (error) => {
          console.error('Erro ao atualizar item:', error);
          alert('Erro ao salvar o item');
        }
      });
    }
  }   

  // Método para marcar item como comprado
  marcarComoComprado(item: Item) {
    if (item.id && item.title && item.title.trim() !== '') {
      this.shoppingService.updateItem(item.id, { included: !item.included }).subscribe({
        next: () => {
          item.included = !item.included;
          console.log('Item atualizado com sucesso');
        },
        error: (error) => {
          console.error('Erro ao marcar como comprado:', error);
          alert('Erro ao marcar o item');
        }
      });
    }
  }

  // Método para excluir item
  excluirItem(item: Item, index: number) {
    if (item.id) {
      this.shoppingService.deleteItem(item.id).subscribe({
        next: () => {
          this.items.splice(index, 1);
          console.log('Item excluído com sucesso');
        },
        error: (error) => {
          console.error('Erro ao excluir item:', error);
          alert('Erro ao excluir o item');
        }
      });
    }
  }
}
