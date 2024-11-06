import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ShoppingListService } from '../services/shopping-list.service';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

interface User {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
}

interface Item {
  id?: number;
  title: string;
  userId: string;
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
export class ListaComprasComponent implements OnInit {
  novoItem: string = '';
  items: Item[] = [];
  isAuthenticated: boolean = false;
  user?: User;

  constructor(
    private userService: UserService,
    private shoppingService: ShoppingListService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.user = {
          id: user.sub ?? '',
          name: user.nickname ?? '',
          email: user.email ?? '',
          email_verified: user.email_verified ?? false
        };
      }
    });
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      } else {
        setTimeout(() => {
          this.verificarOuSalvarUsuario(this.user);
        }, 1000);
      }
    });
  }

  // Verifica ou salva o usuário
  verificarOuSalvarUsuario(user: any) {
    console.log('Verificando o usuário:', user);
    this.userService.getUserById(user.id).subscribe({
      next: (users) => {
        let usuarioExistente: boolean = false;
        users.forEach((u: any) => {
          if (this.user && this.user.id === u.id) {
            usuarioExistente = true;
          }
        });

        if (!usuarioExistente) {
          // Usuário não encontrado, vamos salvar
          this.userService.addUser(user).subscribe({
            next: (res) => {
              console.log('Usuário salvo com sucesso:', res);
              this.obterItems();
            },
            error: (error) => {
              console.error('Erro ao salvar o usuário:', error);
            }
          });
        } else {
          // Usuário já existe
          console.log('Usuário já cadastrado:', users[0]);
          this.obterItems();
        }
      },
      error: (error) => {
        console.error('Erro ao verificar o usuário:', error);
      }
    });
  }

  // Método para obter itens da API
  obterItems() {
    if (this.user) {
      this.shoppingService.getShoppingList(this.user.id).subscribe({
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
  }

  // Método para adicionar item
  adicionarItem() {
    if (this.user && this.novoItem && this.novoItem.trim() !== '') {
      const itemAdded: Item = { title: this.novoItem, userId: this.user.id, included: false, editing: false };

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

  // Método de logout
  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }
}
