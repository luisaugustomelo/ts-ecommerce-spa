import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService} from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id)
      .then( (oferta: Oferta) => {
        this.oferta = oferta;
      });
    });



    // this.route.params.subscribe((parametro: any) => {
    //   console.log('O pametro passado foi:' + parametro.id);
    // });
    console.log('Itens do carrinho', this.carrinhoService.exibirItens());


  }

  ngOnDestroy() {
  }

  public adicionarItemCarrinho(): void {
    console.log(this.oferta);
    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItens());
  }

}
