'use client';
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;
const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE;

export default function RegisterPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  async function register(){
    const res = await fetch(`${API}/auth/register`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, password, name, admin_code: code })
    });
    const data = await res.json();
    if(data.token){
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/;`;
      window.location.href = "/";
    } else {
      alert(data.error || "Registration failed");
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border rounded-xl px-3 py-2 mb-2"/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-xl px-3 py-2 mb-2"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-xl px-3 py-2 mb-2"/>
      <input value={code} onChange={e=>setCode(e.target.value)} placeholder="Admin code (optional)" className="w-full border rounded-xl px-3 py-2 mb-2"/>
      <button onClick={register} className="btn w-full">Sign up</button>
    </div>
  );
}
