"use client";
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setState("err");
    try {
      const list = JSON.parse(localStorage.getItem("jn:newsletter") ?? "[]");
      localStorage.setItem("jn:newsletter", JSON.stringify([...new Set([...list, email.toLowerCase()])]));
    } catch {}
    setState("ok"); setEmail("");
  };
  return (
    <div>
      <form onSubmit={submit} noValidate className="mt-6 flex h-[42px] max-w-[276px] items-center rounded-xl bg-white pl-5 pr-[5px] shadow-[0_6px_24px_-6px_rgba(0,0,0,0.12)]">
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="Masukkan alamat email" aria-label="Alamat email" className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#B0B0B5]" />
        <button type="submit" aria-label="Kirim" className="grid size-8 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"><Send size={14} /></button>
      </form>
      <p role="status" className={`mt-2 text-[12px] ${state === "err" ? "text-red-500" : "text-brand"}`}>
        {state === "ok" ? "Terima kasih, kamu sudah terdaftar!" : state === "err" ? "Format email belum benar." : ""}
      </p>
    </div>
  );
}
