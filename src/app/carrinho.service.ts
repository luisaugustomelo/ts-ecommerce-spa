import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta:   Oferta): void {
        console.log('Oferta recebida pelo serviço', oferta);
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        let itemCarrinhoEncontrado =  this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade += 1;
        } else {
            this.itens.push(itemCarrinho);
        }

        console.log(itemCarrinho);
    }

    public totalCarrinhoCompras(): number {
        let total: number = 0;
        console.log('Total carrinho compras: ',  this.itens);
        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.valor * item.quantidade);
        });

        return total;
    }

    public adicionarQuantidade(item: ItemCarrinho): void {
        item.quantidade++;
    }

    public removerItem(item: ItemCarrinho): void {
        if (item.quantidade > 0) {
            item.quantidade--;
        }

        if (item.quantidade === 0) {
            this.itens.splice(this.itens.indexOf(item), 1);
        }
    }

    public limparCarrinho (): void {
        this.itens = [];
    }
}

export {CarrinhoService};
