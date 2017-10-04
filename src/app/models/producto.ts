import { Categoria } from './categoria';
export class Producto
{
    constructor(
        public codigoBarras:string,
        public nombre:string,
        public descripcion:string,
        public cantidad:number,
        public precioCompra:number,
        public precioVenta:number,
        public categoria: any
    )
    {
    }
}