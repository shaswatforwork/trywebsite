import Link from "next/link";

export default function Home(){
  return (
    <section className="space-y-8">
      <div className="rounded-3xl p-10 bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow">
        <h1 className="text-4xl font-bold">Welcome to <span className="underline decoration-white/50">RUDRAVYA</span></h1>
        <p className="mt-2 text-white/90">Lab‑grade electronics, sensors, Arduino, ESP32 & DIY kits — trusted by students, makers and labs.</p>
        <div className="mt-6">
          <Link href="/products" className="btn bg-white text-slate-900 hover:bg-white/90">Shop now</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Feature title="Fast Shipping" desc="Pan‑India delivery with reliable partners."/>
        <Feature title="Genuine Parts" desc="Sourced from trusted suppliers only."/>
        <Feature title="Maker Support" desc="Beginner‑friendly guides & customer support."/>
      </div>
    </section>
  );
}

function Feature({title, desc}:{title:string, desc:string}){
  return (
    <div className="card">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
