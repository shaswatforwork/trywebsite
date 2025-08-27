'use client';
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function ProductAdmin(){
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ sku:"", title:"", description:"", price:0, category:"", stock:0, images:[] });
  const token = typeof window!== "undefined" ? localStorage.getItem("token") : ""

  async function list(){
    const d = await fetch(`${API}/products`).then(r=>r.json());
    setItems(d.items||[]);
  }
  useEffect(()=>{ list(); },[]);

  async function presign(file: File){
    const res = await fetch(`${API}/uploads/presign`, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ contentType: file.type })
    });
    return res.json();
  }

  async function uploadImage(file: File){
    const { url, publicUrl } = await presign(file);
    const put = await fetch(url, { method:"PUT", headers: { "Content-Type": file.type }, body: file });
    if(!put.ok){ alert("Upload failed"); return; }
    setForm((f:any)=>({ ...f, images: [...(f.images||[]), publicUrl ] }));
  }

  async function save(){
    const res = await fetch(`${API}/products`, {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ ...form, price: Math.round(Number(form.price)*100) })
    });
    if(res.ok){ setForm({ sku:"", title:"", description:"", price:0, category:"", stock:0, images:[] }); list(); }
    else alert("Failed");
  }

  async function del(id:string){
    const res = await fetch(`${API}/products/${id}`, { method:"DELETE", headers: { "Authorization": `Bearer ${token}` } });
    if(res.ok) list();
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="font-semibold mb-3">Add Product</h2>
        {["sku","title","category"].map(k=>(
          <input key={k} placeholder={k.title()} value={form[k]||""} onChange={e=>setForm({...form,[k]:e.target.value})} className="w-full border rounded-xl px-3 py-2 mb-2"/>
        ))}
        <textarea placeholder="description" value={form.description||""} onChange={e=>setForm({...form,description:e.target.value})} className="w-full border rounded-xl px-3 py-2 mb-2"></textarea>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="price ₹" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="border rounded-xl px-3 py-2"/>
          <input type="number" placeholder="stock" value={form.stock} onChange={e=>setForm({...form,stock:parseInt(e.target.value||"0")})} className="border rounded-xl px-3 py-2"/>
        </div>
        <div className="mt-3">
          <input type="file" accept="image/*" onChange={e=>e.target.files&&uploadImage(e.target.files[0])}/>
          <div className="flex gap-2 mt-2 flex-wrap">{(form.images||[]).map((u:string,i:number)=>(<img key={i} src={u} alt="" className="w-16 h-16 rounded object-cover"/>))}</div>
        </div>
        <button onClick={save} className="btn mt-3">Save</button>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3">Products</h2>
        <div className="space-y-2 max-h-[70vh] overflow-auto">
          {items.map((p:any)=>(
            <div key={p.id} className="p-2 border rounded-xl flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-slate-500">{p.sku}</div>
              </div>
              <button onClick={()=>del(p.id)} className="text-sm text-red-600 hover:underline">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

declare global { interface String { title(): string; } }
String.prototype.title = function(){ return this.charAt(0).toUpperCase()+this.slice(1); };
