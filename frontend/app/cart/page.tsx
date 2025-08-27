'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage(){
  const [cart, setCart] = useState<any[]>([]);
  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem("cart")||"[]"));
  },[]);
  const total = cart.reduce((s,it)=>s+it.price*it.qty,0);
  function remove(id:string){
    const next = cart.filter(it=>it.id!==id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length===0 ? <p>Cart is empty.</p> : (
        <div className="space-y-3">
          {cart.map(it=>(
            <div key={it.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image || "https://via.placeholder.com/100"} alt="" className="w-16 h-16 rounded object-cover"/>
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-slate-500">Qty: {it.qty}</div>
                </div>
              </div>
              <div className="font-semibold">₹ {(it.price*it.qty/100).toFixed(2)}</div>
              <button onClick={()=>remove(it.id)} className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Total: ₹ {(total/100).toFixed(2)}</div>
            <Link href="/checkout" className="btn">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
