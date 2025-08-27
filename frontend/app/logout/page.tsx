'use client';
import { useEffect } from "react";

export default function Logout(){
  useEffect(()=>{
    localStorage.removeItem("token");
    document.cookie = "token=; Max-Age=0; path=/;";
    window.location.href = "/";
  },[]);
  return <div>Logging out...</div>
}
