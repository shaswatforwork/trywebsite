'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function ProductView({ id }:{ id:string }){
  const [p, setP] = useState<any>(null);
  const [qty, setQty] = useState(1);
  useEffect(()=>{
    fetch(`${API}/products/${id}`).then(r=>r.json()).then(setP);
  },[id]);
  if(!p) return <div>Loading...</div>;
  const price = (p.price/100).toFixed(2);

  function addToCart(){
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    const existing = cart.find((it:any)=>it.id===p.id);
    if(existing) existing.qty += qty;
    else cart.push({ id:p.id, title:p.title, price:p.price, image:p.images?.[0], qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.images?.[0] || "https://via.placeholder.com/800x600"} alt={p.title} className="w-full rounded-2xl shadow" />
      <div>
        <h1 className="text-3xl font-bold">{p.title}</h1>
        <p className="text-slate-500">{p.sku}</p>
        <div className="text-2xl font-bold mt-2">₹ {price}</div>
        <p className="mt-4 whitespace-pre-wrap">{p.description}</p>

        <div className="mt-6 flex gap-2 items-center">
          <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value||"1"))} className="w-20 border rounded-xl px-3 py-2" />
          <button onClick={addToCart} className="btn">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
