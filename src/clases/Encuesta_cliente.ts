export class EncuestaCliente
{
    cliente;
    pedido;
    valorMozo;
    valorCocinero;
    valorBartender;
    valorMesa;
    valorResturant;
    sugerencia;

    dameJSON() {
        return JSON.parse( JSON.stringify(this));
      }
}