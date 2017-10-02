import { Producto } from './producto';

export class Venta
{
    constructor(
        public id:number,
        public fechaVenta:string,
        public productosVendidos:Array<Producto>,
        public total:number
    )
    {
        
    }
}