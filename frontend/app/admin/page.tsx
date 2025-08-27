import Link from "next/link";

export default function AdminPage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/products" className="card hover:shadow-lg transition">
          <div className="font-semibold">Products</div>
          <div className="text-sm text-slate-500">Create, edit, delete products</div>
        </Link>
      </div>
      <p className="text-sm text-slate-500">You must be logged in as admin to access tools.</p>
    </div>
  );
}
