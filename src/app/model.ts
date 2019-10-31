export class Product {
    public ProductID: number;
    public ProductName = '';
    public Discontinued = false;
    public UnitsInStock: number = 1;
    public UnitPrice = 0;
    public PType: ProductType = null;
}

export class ProductType {
    public Id: number;
    public Name: number;
}
