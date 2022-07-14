export class Product {
  category: string;
  code: string;
  name: string;
  price: Number;
  releaseDate: Date;
  weight: Number;
  specs: any[];
  description: string;
  createdBy: string;

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
