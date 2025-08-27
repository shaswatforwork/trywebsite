import ProductView from "./product-view";

export default function Page({ params }:any){
  return <ProductView id={params.id}/>;
}
