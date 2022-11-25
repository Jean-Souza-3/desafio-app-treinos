import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Atividade } from '../interfaces/atividade';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  novaAtividade: string = "";
  atividades: Atividade[] = [];


  constructor(private storage: Storage) {
    this.iniciarBanco();
  }

  async iniciarBanco(){
    await this.storage.create();
    this.atividades = await this.storage.get('atividades') ?? [];
  }

  async adicionarAtividade(){
    let atividade = {nome: this.novaAtividade, peso: undefined}
    this.atividades.push(atividade);
    this.novaAtividade = "";
    await this.storage.set('atividades', this.atividades);
    console.log(this.atividades)
  }

  async atualizarAtividade(){
    await this.storage.set('atividades', this.atividades);
  }

  async apagarAtividade(index = 0){
    this.atividades.splice(index, 1);
    await this.storage.set('atividades', this.atividades);
  }

}
