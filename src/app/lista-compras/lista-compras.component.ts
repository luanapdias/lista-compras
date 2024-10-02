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
  items: { nome: string; comprado: boolean }[] = [];

  adicionarItem() {
    if (this.novoItem.trim() !== '') {
      this.items.push({ nome: this.novoItem, comprado: false });
      this.novoItem = '';
    }
  }

  marcarComoComprado(item: { nome: string; comprado: boolean }) {
    item.comprado = !item.comprado;
  }

  excluirItem(index: number) {
    this.items.splice(index, 1);
  }
}

