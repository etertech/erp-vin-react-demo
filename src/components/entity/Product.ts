export interface Product {
  id?:Number;
  productName: string;
  price: number;
  productUnit_id: number;
  productUnitName:string;
  soldQuantity: number;
  description: string;
  stock: number;
  year: number;
  warehouse_id: number;
  warehouseName: string;
  category_id: number;
  categoryName: string;
  productPhotos?: { id: number; photoLink: string; }[]; // <- Array of product photos
  quantity?: number;
}