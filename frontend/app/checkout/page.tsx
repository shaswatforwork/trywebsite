'use client';
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function CheckoutPage(){
  const [cart, setCart] = useState<any[]>([]);
  const [shipping, setShipping] = useState<any>({ name:"", phone:"", address:"", city:"", state:"", pincode:"" });
  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem("cart")||"[]"));
  },[]);
  const total = cart.reduce((s,it)=>s+it.price*it.qty,0);

  async function placeOrder(){
    const token = localStorage.getItem("token");
    if(!token){ alert("Please login first"); return; }
    const items = cart.map(it=>({ productId: it.id, qty: it.qty }));
    const res = await fetch(`${API}/orders`, {
      method:"POST",
      headers: { "Content-Type":"application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ items, shipping })
    });
    const data = await res.json();
    if(data.id){
      alert("Order placed! " + data.id + "\n(COD placeholder – integrate Razorpay later)");
      localStorage.removeItem("cart");
      window.location.href = "/";
    }else{
      alert(data.error || "Failed");
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="font-semibold mb-3">Shipping details</h2>
        {["name","phone","address","city","state","pincode"].map(k=>(
          <input key={k} placeholder={k.title()} value={shipping[k]}
            onChange={e=>setShipping({ ...shipping, [k]: e.target.value })}
            className="w-full border rounded-xl px-3 py-2 mb-2"/>
        ))}
      </div>
      <div className="card">
        <h2 className="font-semibold mb-3">Summary</h2>
        <div>Items: {cart.length}</div>
        <div className="text-xl font-bold mt-2">Total: ₹ {(total/100).toFixed(2)}</div>
        <button onClick={placeOrder} className="btn mt-4 w-full">Place order (COD)</button>
      </div>
    </div>
  );
}

// small helper
declare global { interface String { title(): string; } }
String.prototype.title = function(){ return this.charAt(0).toUpperCase()+this.slice(1); };
