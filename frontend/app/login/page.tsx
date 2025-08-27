'use client';
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(){
    const res = await fetch(`${API}/auth/login`, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(data.token){
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/;`;
      window.location.href = "/";
    } else {
      alert(data.error || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-xl px-3 py-2 mb-2"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-xl px-3 py-2 mb-2"/>
      <button onClick={login} className="btn w-full">Login</button>
    </div>
  );
}
