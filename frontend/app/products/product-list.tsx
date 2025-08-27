'use client';
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function ProductList(){
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState("");
  useEffect(()=>{
    fetch(`${API}/products?q=${encodeURIComponent(q)}`)
      .then(r=>r.json())
      .then(d=>setItems(d.items||[]));
  },[q]);
  return (
    <>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Arduino, ESP32, Sensor..." className="w-full md:w-1/2 border rounded-xl px-4 py-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {items.map(p=>(<ProductCard key={p.id} p={p}/>))}
      </div>
    </>
  );
}
