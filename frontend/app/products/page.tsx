import ProductList from "./product-list";

export default function ProductsPage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Products</h1>
      <ProductList/>
    </div>
  );
}
