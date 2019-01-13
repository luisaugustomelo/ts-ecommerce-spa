import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extension';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})

export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap((termo: string) => {
        if(termo.trim() === ''){
          console.log('pesquisando: ', termo);
          return Observable.of<Oferta[]>([]);  
        }
        console.log('pesquisando: ', termo);
        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((err: any) => {
        return Observable.of<Oferta[]>([]);
      });     
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('pesquisa: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next();
  }
}
