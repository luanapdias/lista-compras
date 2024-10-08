import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-compras',
  standalone: true,
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ListaComprasComponent {
  novoItem: string = '';
  items: { nome: string; comprado: boolean; editando: boolean }[] = [];

  adicionarItem() {
    if (this.novoItem.trim() !== '') {
      this.items.push({ nome: this.novoItem, comprado: false, editando: false });
      this.novoItem = '';
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
    this.items.splice(index, 1);
  }
}
