'use client';
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ p }:{ p:any }){
  const price = (p.price/100).toFixed(2);
  const img = Array.isArray(p.images) && p.images[0] ? p.images[0] : "https://via.placeholder.com/600x400?text=RUDRAVYA";
  return (
    <Link href={`/products/${p.id}`} className="card group">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <h3 className="font-semibold">{p.title}</h3>
      <p className="text-sm text-slate-500">{p.sku}</p>
      <div className="mt-2 font-bold">₹ {price}</div>
    </Link>
  );
}
